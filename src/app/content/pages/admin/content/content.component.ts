import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/content/services/notification.service';
import { PageContentService } from 'src/app/content/services/pagecontent.service';
import { SpecialityService } from 'src/app/content/services/speciality.service';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { PageContent } from '../admin-about/pagecontent.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  title: string = "Packages";
  editor = ClassicEditor as unknown as {
    create: any;
  };

  public model = {
    editorData: ''
  };


  baseUrl = ''
  page_group: string = ''
  constructor(private http: HttpClient,
    private appconfig: JsonAppConfigService,
    private contentService: PageContentService,
    private router: ActivatedRoute,
    private _Router : Router,
    private modal: NgbModal,
    private toastr: NotificationService,

  ) {
    this.baseUrl = appconfig.baseUrl;

    var param = this.router.snapshot.paramMap.get('id');
    if (param) {
      this.page_group = param;
      // this.content.page_group = param;
    }
    // this.page_group=router.ac
    // contentService.getPageContent().subscribe(x => {
    //        .map(epics => epics.filter(epic => epic.id === id)[0]);

    // })
    this._Router.routeReuseStrategy.shouldReuseRoute = () => false;


  }
  ngOnInit(): void {

    this.getEpic();
    this.content.page_group = this.page_group
  }



  deleteImage(data: any) {
    if (confirm("Are you sure want to delete the image?")) {
      const token = localStorage.getItem('access_token');
      const options = {
        'headers': { 'Authorization': 'Bearer' + token }
      }
      var postUrl = "api/DeletePhoto"
      var payload = {
        "id": data.id,
      }
      this.http.post(this.baseUrl + postUrl, payload, options)
        .subscribe(
          {
            next: res => this.successDeleteToastr(),
            error: res => this.errorDeleteToastr(),
          })
    }
    else {
      return;
    }
  }
  deleteContent(data: any) {

    if (confirm("Are you sure want to delete the content?")) {
      const token = localStorage.getItem('access_token');
      const options = {
        'headers': { 'Authorization': 'Bearer' + token }
      }
      var postUrl = "api/DeletePageContent"
      var payload = {
        "sn": data.sn,
      }
      this.http.post(this.baseUrl + postUrl, payload, options)
        .subscribe(
          {
            next: res => this.successDeleteToastr(),
            error: res => this.errorDeleteToastr(),
          })
    }
    else {
      return;
    }

  }

  //success delete data
  successDeleteToastr() {
    this.toastr.showSuccess(`Successfully Deleted Content`, this.title)
    this.modal.dismissAll()
  }
  //error delete data
  errorDeleteToastr() {
    this.toastr.showError(`Error Deleting Content`, this.title)
  }



  contents: any = [];
  content = new PageContent();


  imageVisible: boolean = false;

  imageShow() {
    if (!this.imageVisible) {
      this.imageVisible = true
    }
  }
  imageHide() {
    this.imageVisible = false
  }

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
    this.successToastr();
    this.getEpic();
    this.reset()
    this.getPicture();
    this.modal.dismissAll();
  }
  //success toastr
  successToastr() {
    this.toastr.showSuccess(`Successfully ${this.edit ? "Edited" : "Added"} Content`, this.title)
  }
  //error toastr
  errorToastr() {
    this.toastr.showError(`Error ${this.edit ? "Editing" : "Adding"} Content`, this.title)
  }
  filterData() {
    this.contents = this.contents.filter((x: { page_group: string; }) => x.page_group === this.content.page_group);

  }
  Error(res: any): void {
    this.errorToastr();
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
      //comfirm image upload
      if (confirm("Are you sure want to upload the image?")) {
      
        let file: File = fileList[0];
        let formData: FormData = new FormData();
        if(this.content.page_group=='events'){
          if(this.imageList!=0){
            formData.append('uploadFile', file, file.name + ".png");
          }
          else{
            formData.append('uploadFile', file, this.selectedContent.sn + ".png");
          }
        }
        else{
        formData.append('uploadFile', file, this.selectedContent.sn + ".png");
      }
        let headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        //    let options = new RequestOptions({ headers: headers });
        this.http.post(baseUrl + "api/FileAPI/UploadFiles?inv_no=" + this.selectedContent.sn + "&userid=" + this.selectedContent.sn + "&file_type=" + this.content.page_group
          , formData, { headers: { Authorization: 'Bearer ' + token } })
          // .map(res => res.json())
          // .catch(error => Observable.throw(error))
          .subscribe(
            {
              next:res=>this.getPicture(),
              error:err => console.error(err)

            }
           
          )
      }
    }
    else {
      fileList = new FileList
      return;
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
      '&file_type=' + this.content.page_group
    this.http.get(baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + this.selectedContent.sn + "&sn=" + this.selectedContent.sn + "&file_type=" + this.content.page_group
      // baseUrl + demourl
      , { headers: { Authorization: 'Bearer ' + token } })
      .subscribe({

        next: data => this.storePic(data),
        error: res => console.error(res)

      }
      )
  }


  fileList: any;
  fileLink: any;
  imageList:any=[]

  storePic(res: any) {
    this.fileList = res;
    this.imageList=res;
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
    this.model = {
      editorData: ''
    };
    
    this.content.page_group = this.page_group;

    // this.content.page_group = "packages";
    this.fileList = []
    this.imageVisible = false;
  }

}
