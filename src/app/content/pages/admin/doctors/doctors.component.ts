import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DoctorsService } from 'src/app/content/services/doctors.service';
import { MaxSnService } from 'src/app/content/services/maxsn.service';
import { NotificationService } from 'src/app/content/services/notification.service';
import { PageContentService } from 'src/app/content/services/pagecontent.service';
import { SpecialityService } from 'src/app/content/services/speciality.service';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { PageContent } from '../admin-about/pagecontent.model';
import { RefererInsert, SpecialityInsert } from './doctors.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {

  title: string = "Doctors";

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
    private doctorService: DoctorsService,
    public toastr: NotificationService,
    private maxParam: MaxSnService,
    private specialityService: SpecialityService
  ) {
    this.baseUrl = appconfig.baseUrl;

    // contentService.getPageContent().subscribe(x => {
    //        .map(epics => epics.filter(epic => epic.id === id)[0]);

    // })
  }

  ngOnInit(): void {

    this.getDepartmentList();
    this.content.page_group = "doctors";

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
  //success delete data
  successDeleteToastr() {
    this.toastr.showSuccess(`Successfully Deleted Content`, this.title)
    //close modal
    this.modal.dismissAll();
  }
  //error delete data
  errorDeleteToastr() {
    this.toastr.showError(`Error Deleting Content`, this.title)
  }
  search = ''

  contents: any = [];
  content = new PageContent();

  getDepartmentList() {
    this.doctorService.getDoctorList().subscribe(
      {
        next: res => this.refList = res,
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
    this.successToastr();
    this.getDepartmentList();
    this.reset()
    // this.getPicture();
    this.modal.dismissAll();
  }


  selectedContent: any = [];
  selectedRef: any = []
  selectContent(x: any) {

    this.selectedContent = x;
    this.selectedRef = x;
    this.getContent();

    this.fileList = []

  }


  refList: any = [];
  getContent() {
    this.contentService.getPageContent().subscribe(
      {
        next: res => this.contents = res,
        error: res => this.Error(res),
        complete: () => this.filterContent()
      }

    )
  }



  imageName: string = ''
  filterContent() {
    this.contents = this.contents.filter((x: { page_title: string; page_group: string; }) => x.page_title === this.selectedContent.refid.toString() && x.page_group === "doctors");

    // EDIT CONTENT
    if (this.contents.length !== 0) {
      this.edit = true
      this.content = this.contents[0]

      this.model.editorData = this.contents[0].page_text;

      this.selectedContent = this.content;

      this.getPicture();
      this.imageName = this.selectedContent.page_title + ".png"




    }

    // NEW CONTENT
    if (this.contents.length === 0) {
      this.edit = false
      this.content = new PageContent();
      this.content.page_title = this.selectedContent.refid
      this.model.editorData = this.selectedContent.referer;
      this.content.page_group = "doctors"
      this.imageName = this.selectedContent.refid + ".png"

    }

  }

  filterData() {
    this.contents = this.contents
    // .filter((x: { published: boolean; }) => x.published === true);

  }

  //success toastr  
  successToastr() {
    this.toastr.showSuccess(`Successfully ${this.edit ? "Edited" : "Added"} Content`, this.title)
  }

  //error toastr
  errorToastr() {
    this.toastr.showError(`Error ${this.edit ? "Editing" : "Adding"} Content`, this.title)
  }



  Error(res: any): void {
    // console.log(res)
    this.errorToastr();
    // throw new Error('Method not implemented.');
  }




  mapToModel() {
    this.content.page_text = this.model.editorData;
  }




  fileChange(event: any) {
    const baseUrl = this.appconfig.baseUrl;
    var token = localStorage.getItem('access_token');

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();

      formData.append('uploadFile', file, this.imageName);
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      //    let options = new RequestOptions({ headers: headers });
      this.http.post(baseUrl + "api/FileAPI/UploadFiles?inv_no=" + this.selectedRef.refid +
        "&userid=" + this.selectedRef.refid + "&file_type=doctors"
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
    this.togglePublishImage();


  }
  togglePublish(sp: any) {

    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = "api/RefererWebPublished";

    var payload = {
      sp_id: sp.refid,
      published: sp.published
    }

    this.http.post(this.appconfig.baseUrl + postUrl, payload, options)
      .subscribe(
        {
          next: res => this.Success(res),
          error: res => this.Error(res),
        })

  }


  getPicture() {
    var token = localStorage.getItem('access_token');
    // var userId = this.authorize.getUserId();
    const baseUrl = this.appconfig.baseUrl;
    var demourl = 'api/OnlineAppointmentRequestFile?userid=' + this.selectedRef.refid +
      '&sn=' + this.selectedRef.refid +
      '&file_type=doctors'
    this.http.get(baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + this.selectedRef.refid + "&sn=" + this.selectedRef.refid + "&file_type=doctors"
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
    const baseUrl = this.appconfig.baseUrl;

    this.fileLink =
      baseUrl + '/api/OnlineUploadFileDownload?userid=' + this.selectedRef.refid + '&sn=' + this.selectedRef.refid
    // '&file_type=ANGULAR'
    // fileLink = this.baseUrl + 'api/OnlineUploadFileDownload?userid='+vm.selectedBlog.sn+'&sn='+vm.selectedBlog.sn;
    // $scope.fileType = 'SERVICES';
  }



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



  imageVisible: boolean = false;


  imageShow() {
    this.imageVisible = true

  }
  imageHide() {
    this.imageVisible = false
  }

  reset() {
    this.edit = false;
    this.content = new PageContent()
    this.model = {
      editorData: ''
    };
    this.content.page_group = "doctors";
    this.fileList = []
    this.imageVisible = false;

  }
  submit(form: NgForm) {


    var invalidControl = document.querySelector('input.ng-invalid');
    if (invalidControl) {
      (invalidControl as HTMLElement).focus();
      return;
    }

    if (form.valid) {
      this.postMember()
    }
  }



  formData = new SpecialityInsert;
  specialityList: Array<any> = new Array<any>();



  postMember() {
    const token = localStorage.getItem('access_token');


    const options = {
      'headers': { 'Authorization': 'Bearer' + token }

    }
    var postUrl = 'api/RefererSetup/Speciality/' + (this.edit ? 'Update' : 'Insert')


    var baseUrl = this.baseUrl + postUrl

    this.http.post(baseUrl, this.formData, options).subscribe({
      next: res => this.SuccessPost(res),
      error: res => this.ErrorPost(res),
    }

    );
  }

  SuccessPost(res: any) {
    this.successToastr();
  }

  ErrorPost(res: any) {
    this.errorToastr();
  }
  refData = new RefererInsert;
  submitRef(form: NgForm) {
    var invalidControl = document.querySelector('input.ng-invalid');
    if (invalidControl) {
      (invalidControl as HTMLElement).focus();
      return;
    }

    if (form.valid) {
      this.postReferer()

    }
  }
  selectedSpeciality: any = [];

  postReferer() {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl

    this.edit
      ?
      postUrl = 'api/RefererSetup/Update'
      :
      postUrl = 'api/Billing/Catalogue/Referer/Insert'


    var baseUrl = this.baseUrl + postUrl

    this.http.post(baseUrl, this.refData, options).subscribe({
      next: res => this.SuccessPost(res),
      error: res => this.ErrorPost(res),
    }

    );
  }
  getMax() {
    this.maxParam.getMaxSn('referer', 'refid').subscribe(x => {
      var refid = x[0].newcode;
      this.refData.refid = refid;
    })
  }

  getSpecialityDataFromServer() {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    this.specialityService.getSpecialityList().subscribe({
      next: res => {
        this.specialityList = res.map((i: any) => {
          i.name = i.sp_id + '  -  ' + i.detail;
          return i
        });
      },
    }
    );

  };

  setSpeciality(data: any) {
    this.selectedSpeciality = data;
    this.refData.sp_id = data.sp_id;
  }





}
