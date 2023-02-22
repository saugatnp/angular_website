import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PageContentService } from 'src/app/content/services/pagecontent.service';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { PageContent } from './pagecontent.model';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
})
export class AdminAboutComponent implements OnInit {


  editor = ClassicEditor as unknown as {
    create: any;
  };

  public model = {
    editorData: ''
  };

  baseUrl = ''
  constructor(private http: HttpClient,
    private appconfig: JsonAppConfigService,
    private contentService: PageContentService,
    private modal: NgbModal

  ) {
    this.baseUrl = appconfig.baseUrl;

    // contentService.getPageContent().subscribe(x => {
    //        .map(epics => epics.filter(epic => epic.id === id)[0]);

    // })
  }

  ngOnInit(): void {

    this.getEpic();
  }



  contents: any = [];
  content = new PageContent();

  getEpic() {
    this.contentService.getPageContent().subscribe(
      {
        next: res => this.contents = res,
        error: res => this.Error(res),
        complete: () => this.filterData()
      }

    )
  }

  edit = false;
  postContent() {

    if (this.edit === true) {
      var postUrl = "api/PageContent/update"
    }
    else {
      var postUrl = "api/PageContent"

    }

    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }

    this.http.post(this.baseUrl + postUrl, this.content, options)
      .subscribe(
        {
          next: res => this.Success(res),
          error: res => this.Error(res),
        })
  }

  Success(res: any) {
    this.getEpic();
    this.reset()
    this.getPicture();
    this.modal.dismissAll();
  }


  filterData() {
    this.contents = this.contents.filter((x: { page_group: string; }) => x.page_group === "about");

  }
  Error(res: any): void {
    console.log(res)
    // throw new Error('Method not implemented.');
  }


  selectedContent: PageContent = new PageContent();
  selectContent(x: any) {
    this.edit = true

    this.selectedContent = x;
    this.content = x;
    this.content.page_text = x.page_text;
    this.model.editorData = x.page_text;

    this.getPicture();

    // this.mapToModel()
  }

  mapToModel() {
    this.content.page_text = this.model.editorData;
  }




  fileChange(event: any) {
    const baseUrl = this.baseUrl;
    var token = localStorage.getItem('access_token');

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      //    let options = new RequestOptions({ headers: headers });
      this.http.post(baseUrl + "api/FileAPI/UploadFiles?inv_no=" + this.selectedContent.sn + "&userid=" + this.selectedContent.sn + "&file_type=ABOUT"
        , formData, { headers: { Authorization: 'Bearer ' + token } })
        // .map(res => res.json())
        // .catch(error => Observable.throw(error))
        .subscribe(
          data => this.getPicture()
          ,
          error => console.log(error)
        )
    }
  }
  
  selectedImage: any = [];
  selectImage(x: any) {
    this.selectedImage = x;
  }
  togglePublishImage() {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = "api/OnlineAppointmentRequestFile/update?id=" + this.selectedImage.id + "&published=" + this.selectedImage.published
    this.http.post(this.baseUrl + postUrl, options)
      .subscribe(
        {
          next: res => this.Success(res),
          error: res => this.Error(res),
        })

  }


  getPicture() {
    var token = localStorage.getItem('access_token');
    // var userId = this.authorize.getUserId();
    const baseUrl = this.baseUrl;
    var demourl = 'api/OnlineAppointmentRequestFile?userid=' + this.selectedContent.sn +
      '&sn=' + this.selectedContent.sn +
      '&file_type=ABOUT'
    this.http.get(baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + this.selectedContent.sn + "&sn=" + this.selectedContent.sn + "&file_type=ABOUT"
      // baseUrl + demourl
      , { headers: { Authorization: 'Bearer ' + token } })
      .subscribe({

        next: data => this.storePic(data),
        error: res => console.log(res)

      }
      )
  }


  fileList: any;
  fileLink: any;
  storePic(res: any) {
    // console.log(res);
    this.fileList = res;
    const baseUrl = this.baseUrl;

    this.fileLink =
      baseUrl + '/api/OnlineUploadFileDownload?userid=' + this.selectedContent.sn + '&sn=' + this.selectedContent.sn
    // '&file_type=ANGULAR'
    // fileLink = this.baseUrl + 'api/OnlineUploadFileDownload?userid='+vm.selectedBlog.sn+'&sn='+vm.selectedBlog.sn;
    // $scope.fileType = 'SERVICES';
  }



  reset() {
    this.edit = false;
    this.content = new PageContent()
  }




}
