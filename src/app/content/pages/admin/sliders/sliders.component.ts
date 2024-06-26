import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/content/services/notification.service';
import { PageContentService } from 'src/app/content/services/pagecontent.service';
import { SpecialityService } from 'src/app/content/services/speciality.service';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { PageContent } from '../admin-about/pagecontent.model';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {

  title: string = "Sliders";

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
    private modal: NgbModal,
    private specialityService: SpecialityService,
    public toastr: NotificationService,
    // private imageCompress: NgxImageCompressService
  ) {
    this.baseUrl = appconfig.baseUrl;

    // contentService.getPageContent().subscribe(x => {
    //        .map(epics => epics.filter(epic => epic.id === id)[0]);

    // })
  }

  ngOnInit(): void {

    this.getPicture();
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
            complete: () => {
              this.getPicture();
            },
          })
    }
    else {
      return;
    }
  }
  //success delete data
  successDeleteToastr() {
    this.toastr.showSuccess(`Successfully Deleted Content`, this.title)
  }
  //error delete data
  errorDeleteToastr() {
    this.toastr.showError(`Error Deleting Content`, this.title)
  }
  contents: any = [];
  content = new PageContent();
  deptList: any = []
  getDepartmentList() {
    this.specialityService.getSpecialityList().subscribe(
      {
        next: res => this.deptList = res,
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

    this.http.post(this.appconfig.baseUrl + postUrl, this.content, options)
      .subscribe(
        {
          next: res => this.Success(res),
          error: res => this.Error(res),
        })
  }

  Success(res: any) {
    this.successToast();
    this.getDepartmentList();
    this.reset()
    // this.getPicture();
    this.modal.dismissAll();
  }

  //success Toastr
  successToast() {
    this.toastr.showSuccess(`Successfully ${this.edit ? "Edited" : "Updated"} Content`, this.title)
  }

  //error Toastr
  errorToast() {
    this.toastr.showError(`Error ${this.edit ? "Editing" : "Updated"} Content`, this.title)
  }



  filterData() {

    this.deptList = this.deptList;
  }








  Error(res: any): void {
    this.errorToast();
    // throw new Error('Method not implemented.');
  }


  selectedContent: any = []
  selectContent(x: any) {
    // this.edit = true


    this.selectedContent = x;
    // this.content = x;

    // this.content.page_title = x.sp_id
    // this.content.page_group = "departments"
    // this.content.page_text = x.detail;
    // this.model.editorData = x.detail;


    this.getPicture();

    // this.mapToModel()
  }



  getContent() {
    this.contentService.getPageContent().subscribe(
      {
        next: res => this.contents = res,
        error: res => this.Error(res),
        complete: () => this.filterContent()
      }

    )
  }

  filterContent() {
    this.contents = this.contents.filter((x: { page_title: string; page_group: string; }) => x.page_title === this.selectedContent.sp_id.toString());

    if (this.contents.length !== 0) {
      this.edit = true
      this.content = this.contents[0]

      this.model.editorData = this.contents[0].page_text;

      this.selectedContent = this.content;

      this.getPicture();


    }
    if (this.contents.length === 0) {
      this.edit = false
      this.content = new PageContent();
      this.content.page_title = this.selectedContent.sp_id
      this.model.editorData = this.selectedContent.detail;
      this.content.page_group = "departments"

    }

  }




  mapToModel() {
    this.content.page_text = this.model.editorData;
  }

  file: any;
  // localUrl: any;
  // localCompressedURl:any;
  // sizeOfOriginalImage:number | undefined;
  // sizeOFCompressedImage:number | undefined;
  // selectFile(event: any) {
  // var  fileName : any;
  // this.file = event.target.files[0];
  // fileName = this.file['name'];
  // if (event.target.files && event.target.files[0]) {
  // var reader = new FileReader();
  // reader.onload = (event: any) => {
  // this.localUrl = event.target.result;
  // this.compressFile(this.localUrl,fileName)
  // }
  // reader.readAsDataURL(event.target.files[0]);
  // }
  // }
  // imgResultBeforeCompress:string | undefined;
  // imgResultAfterCompress:string | undefined;
  // compressFile(image: string,fileName: any) {
  // var orientation = -1;
  // this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
  // // console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);
  // this.imageCompress.compressFile(image, orientation, 50, 50).then(
  // result => {
  // this.imgResultAfterCompress = result;
  // this.localCompressedURl = result;
  // this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
  // console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);
  // // create file from byte
  // const imageName = fileName;
  // // call method that creates a blob from dataUri
  // const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
  // //imageFile created below is the new compressed file which can be send to API in form data
  // const imageFile = new File([result], imageName, { type: 'image/jpeg' });
  // });}
  // dataURItoBlob(dataURI: string) {
  // const byteString = window.atob(dataURI);
  // const arrayBuffer = new ArrayBuffer(byteString.length);
  // const int8Array = new Uint8Array(arrayBuffer);
  // for (let i = 0; i < byteString.length; i++) {
  // int8Array[i] = byteString.charCodeAt(i);
  // }
  // const blob = new Blob([int8Array], { type: 'image/png' });
  // // this.fileChange(blob);
  // return blob;
  // }




  async selectFile(event: any) {
    // var img = await this.imageCompressor.selectFile(event);
  }



  fileChange(event: any) {

    const baseUrl = this.appconfig.baseUrl;
    var token = localStorage.getItem('access_token');

    let fileList: FileList = event.target.files;
    if (fileList.length!=0) {
      let file: File =  fileList[0]; //event
      let formData: FormData = new FormData();
      var name = Math.random()

      formData.append('uploadFile', file, name + ".png");
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      //    let options = new RequestOptions({ headers: headers });
      this.http.post(baseUrl + "api/FileAPI/UploadFiles?inv_no=" + 101 + "&userid=" + 101 + "&file_type=sliders"
        , formData, { headers: { Authorization: 'Bearer ' + token } })
        // .map(res => res.json())
        // .catch(error => Observable.throw(error))
        .subscribe(
          {
            next: data => this.getPicture(),
            error: err => console.error(err)
          }


        )
    }
  }

  selectedImage: any = [];
  selectImage(x: any) {
    this.selectedImage = x;
    this.togglePublishImage();

  }

  search: string = ''
  togglePublishImage() {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = "api/OnlineAppointmentRequestFile/update?id=" + this.selectedImage.id + "&published=" + this.selectedImage.published
    this.http.post(this.appconfig.baseUrl + postUrl, options)
      .subscribe(
        {
          next: res => this.Success(res),
          error: res => this.Error(res),
        })

  }


  togglePublish(sp: any) {

    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = "api/SpecialityWebPublished";

    var payload = {
      sp_id: sp.sp_id,
      published: sp.published
    }

    this.http.post(this.baseUrl + postUrl, payload, options)
      .subscribe(
        {
          next: res => this.Success(res),
          error: res => this.Error(res),
        })

  }


  getPicture() {
    this.modal.dismissAll();
    var token = localStorage.getItem('access_token');
    // var userId = this.authorize.getUserId();
    const baseUrl = this.appconfig.baseUrl;
    var demourl = 'api/OnlineAppointmentRequestFile?userid=' + 101 +
      '&sn=' + 101 +
      '&file_type=sliders'
    this.http.get(baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + 101 + "&sn=" + 101 + "&file_type=sliders"
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
  storePic(res: any) {
    
    this.fileList = res;
    const baseUrl = this.appconfig.baseUrl;

    this.fileLink =
      baseUrl + '/api/OnlineUploadFileDownload?userid=' + 101 + '&sn=' + 101
    // '&file_type=ANGULAR'
    // fileLink = this.baseUrl + 'api/OnlineUploadFileDownload?userid='+vm.selectedBlog.sn+'&sn='+vm.selectedBlog.sn;
    // $scope.fileType = 'SERVICES';
  }



  reset() {
    this.edit = false;
    this.content = new PageContent()
  }

}
