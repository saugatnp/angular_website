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

  title : string = "Settings";
  settingGroup : SettingsGroup = new SettingsGroup()
  baseUrl = ''
  data : Array<Settings> = new Array<Settings>();
  constructor(
    private http: HttpClient,
    private appconfig: JsonAppConfigService,
    private toastr: NotificationService,
    ){ 
      this.baseUrl = this.appconfig.localUrl;
    }

  ngOnInit(): void {
    this.getFromServer()
  }

  getFromServer(){
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
  successGet(data:any){
    this.data = data;
  }


  sync(){
    var index = 0;
    Object.entries(this.settingGroup).forEach(( [key, value]) => {
      index++;
      const payload = {
        id : index,
        name : key,
        display_name : key,
        value : value,
        published : true,
        serial : index,
        SettingGroup : ''
      }
      this.postToServer(payload);
      
    });
  }

  postToServer(payload : any){
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
  updateToServer(payload : any){
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = 'api/SettingsUpdate';

 this.http.post(this.baseUrl + postUrl, payload, options)
    .subscribe(
      {
        next: res => this.successToastr(),
        error: res => this.errorToastr(),
       
      })
  }

  
  //success toastr
  successToastr() {
    this.toastr.showSuccess(`Successfull`, this.title)
  }

  //error toastr
  errorToastr() {
    this.toastr.showError(`Error `, this.title)
  }

}
