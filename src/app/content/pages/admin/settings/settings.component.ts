import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/content/services/notification.service';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { Settings, SettingsGroup } from './settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  title: string = "Settings";
  settingGroup: SettingsGroup = new SettingsGroup()
  baseUrl = ''
  data: Array<Settings> = new Array<Settings>();



  constructor(
    private http: HttpClient,
    private appconfig: JsonAppConfigService,
    private toastr: NotificationService,
  ) {

    this.baseUrl = this.appconfig.baseUrl;
  }



  ngOnInit(): void {
    this.getFromServer()
    this.getPicture()
  }



  getFromServer() {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = 'api/GetSettingsDetailByName';
    this.http.get(this.baseUrl + postUrl, options)
      .subscribe(
        {
          next: res => this.successGet(res),
          error: res => this.errorToastr(),

        })
  }



  successGet(data: any) {
    this.data = data;
    console.log(this.data)
  }


  sync() {


    //map this.data to payload
    this.data.forEach((item, index) => {
      const payload = {
        id: item.id,
        name: item.name,
        display_name: item.display_name,
        value: item.value,
        published: item.published,
        serial: item.serial,
        SettingGroup: item.settinggroup
      }
      this.updateToServer(payload);
    })


  }




  postToServer(payload: any) {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = 'api/SettingsInsert';
    console.log(payload);
    this.http.post(this.baseUrl + postUrl, payload, options)
      .subscribe(
        {
          next: res => this.successToastr(),
          error: res => this.errorToastr(),

        })
  }




  //update to server
  updateToServer(payload: any) {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = 'api/SettingsUpdate';
    // console.log(payload)
    this.http.post(this.baseUrl + postUrl, payload, options)
      .subscribe(
        {
          next: res => this.successToastr(),
          error: res => this.errorToastr(),

        })
  }



  fileChange(event: any) {

    const baseUrl = this.appconfig.baseUrl;
    var token = localStorage.getItem('access_token');

    let fileList: FileList = event.target.files;
    if (fileList.length != 0) {
      let file: File = fileList[0]; //event
      let formData: FormData = new FormData();
      var name = Math.random()

      formData.append('uploadFile', file, name + ".png");
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      //    let options = new RequestOptions({ headers: headers });
      this.http.post(baseUrl + "api/FileAPI/UploadFiles?inv_no=" + 120 + "&userid=" + 120 + "&file_type=logo"
        , formData, { headers: { Authorization: 'Bearer ' + token } })
        // .map(res => res.json())
        // .catch(error => Observable.throw(error))
        .subscribe(
          {
            next: data => this.getPicture(),
            error: err => console.log(err)
          }


        )
    }
  }

  getPicture() {
    // this.modal.dismissAll();
    var token = localStorage.getItem('access_token');
    // var userId = this.authorize.getUserId();
    const baseUrl = this.appconfig.baseUrl;
    var demourl = 'api/OnlineAppointmentRequestFile?userid=' + 120 +
      '&sn=' + 120 +
      '&file_type=logo'
    this.http.get(baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + 120 + "&sn=" + 120 + "&file_type=logo"
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
      baseUrl + '/api/OnlineUploadFileDownload?userid=' + 120 + '&sn=' + 120
    // '&file_type=ANGULAR'
    // fileLink = this.baseUrl + 'api/OnlineUploadFileDownload?userid='+vm.selectedBlog.sn+'&sn='+vm.selectedBlog.sn;
    // $scope.fileType = 'SERVICES';
  }


  selectedImage: any = [];
  selectImage(x: any) {
    this.selectedImage = x;
    // this.togglePublishImage();

  }



  //success toastr
  successToastr() {
    // this.toastr.showSuccess(`Successfull`, this.title)
  }



  //error toastr
  errorToastr() {
    this.toastr.showError(`Error `, this.title)
  }

}
