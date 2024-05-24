import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { SettingsGroup , UserUploads } from '../pages/admin/settings/settings.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { JsonAppConfigService } from 'src/config/json-app-config.service';




@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  dataChangeObservera: any;
  data: any;
  selectedFirm: any;

  initdate: any;
  finaldate: any;
  initobserver: any;
  finalobserver: any;
  loggedin: boolean = this.auth.checkTokenValidity();
  loggedInAdmin = false; //this.auth.getUserRoles().includes('admin');
  loggedInAsMr = false;//this.auth.getUserRoles().includes('mr');
  pageSelected: string = '';
  moduleSelected: string = '';

  firms: any;
  baseUrl = ''



  constructor(private auth: AuthService,
    private http: HttpClient,
    private appconfig: JsonAppConfigService,


) {
  this.baseUrl = this.appconfig.baseUrl


    // this.firmService.getFirmFromServer().subscribe(x =>
    //   this.selectedFirm = x[0]
    // )
    // this.changeFirm(this.selectedFirm);
  }

  //init observer
//   private initSub = new BehaviorSubject<string>(this.date.getInitDate())
//   currentInit = this.initSub.asObservable();

//   changeInit(newinit: string) {
//     this.initSub.next(newinit);
//   }


userUploadData : UserUploads = new UserUploads();
  getPicture() {
    var token = localStorage.getItem('access_token');
    this.http.get<Array<UserUploads>>(this.baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + 120 + "&sn=" + 120 + "&file_type=logo", { headers: { Authorization: 'Bearer ' + token } })
      .subscribe({
        next: data => this.storePic(data[0]),
        error: res => console.log(res)
      })
  }

//NAVIGATION DYNAMIC Url
private logoUrl = new BehaviorSubject<string>('');
currentLogo = this.logoUrl.asObservable();
changeLogoUrl(newObj: string) {
  this.logoUrl.next(newObj);
}

  fileList: any;
  fileLink: any;
  storePic(res: any) {
    this.fileList = res;
    this.fileLink =     this.baseUrl + "uploads/logo/120/" + res.filenames;
    // this.fileLink = this.baseUrl + '/api/OnlineUploadFileDownload?userid=' + 120 + '&sn=' + 120
  }


  //LIS OGGED IN  
  private dataSub = new BehaviorSubject<boolean>(this.loggedin);
  currentData = this.dataSub.asObservable();

  changeData(newObj: boolean) {
    this.dataSub.next(newObj);
  }

  //LOGGED IN AS ADMIN 
  private adminlog = new BehaviorSubject<boolean>(this.loggedInAdmin);
  currentloggedAdmin = this.adminlog.asObservable();
  changeAdmin(newObj: boolean) {
    this.adminlog.next(newObj);
  }

  //loGGED IN AS MR
  private mrlog = new BehaviorSubject<boolean>(this.loggedInAsMr);
  currentloggedMr = this.mrlog.asObservable();
  changeMr(newObj: boolean) {
    this.mrlog.next(newObj);
  }

  //Page Url
  private onpageselected = new BehaviorSubject<string>(this.pageSelected);
  currentPage = this.onpageselected.asObservable();
  changePage(newObj: string) {
    this.onpageselected.next(newObj);
  }

  //NAVIGATION DYNAMIC Url
  settings = new SettingsGroup();
  private onModuleSelected = new BehaviorSubject<SettingsGroup>(this.settings);
  currentSettings = this.onModuleSelected.asObservable();
  changeSettings(newObj: SettingsGroup) {
    this.onModuleSelected.next(newObj);
  }





}