import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { SettingsService } from './content/services/settings.service';
import { BroadcastService } from './content/services/broadcast.service';
import { UserUploads } from './content/pages/admin/settings/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Medipro';
  show: boolean = true;
  baseUrl = ''

  constructor(
    private router: Router,
    private http : HttpClient,
    private appconfig: JsonAppConfigService,
    private settingService : SettingsService,
    private broadcastService : BroadcastService
    ) {

      this.baseUrl = this.appconfig.baseUrl;

     }
  ngOnInit(): void {
    this.getSettings()
    this.getPicture()
    this.settingService.getSettings();
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

        if (event.url.includes('Admin')) {
          this.show=false

        }
        else 
          this.show = true
      }
    });
  }

  userUploadData : UserUploads = new UserUploads();
  getPicture() {
    var token = localStorage.getItem('access_token');
    this.http.get<Array<UserUploads>>(this.baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + 120 + "&sn=" + 120 + "&file_type=logo", { headers: { Authorization: 'Bearer ' + token } })
      .subscribe({
        next: data => this.storePic(data[data.length -1]),
        error: res => console.error(res)
      })
  }


  fileList: any;
  fileLink: any;
  storePic(res: any) {
    this.fileList = res;
    this.fileLink =     this.baseUrl + "uploads/logo/120/" + res.filenames;
    this.broadcastService.changeLogoUrl(this.fileLink)
    // this.fileLink = this.baseUrl + '/api/OnlineUploadFileDownload?userid=' + 120 + '&sn=' + 120
  }


  fix: boolean = false
  fixNav($event: boolean) {
    this.fix = $event
    // alert($event)
  }
  // @HostListener('window:scroll', ['$event']) 
  // onScroll(event : Event) {
  //     if (document.body.scrollTop > 80 ||     
  //       document.documentElement.scrollTop > 80) {
  //       document.querySelector('#site-header')!.classList.add('nav-fixed')
  //       document.querySelector('#top-header')!.classList.add('no-disp');
  //     } else {
  //       document.querySelector('#site-header')!.classList.remove('nav-fixed')
  //       document.querySelector('#top-header')!.classList.remove('no-disp');
  
  //     }
   
  // }
   topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  getSettings() {
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer' + token }
    }
    var postUrl = 'api/GetSettingsDetailByName?name=color';
    this.http.get(this.baseUrl + postUrl, options)
      .subscribe(
        {
          next: res => this.successGet(res),
          error: res => this.errorToastr(),

        })
  }
  successGet(res: any) {

    //set res to root color using query selector
    document.querySelector<HTMLElement>(':root')!.style.setProperty('--primary-color',res[0].value);
    document.querySelector<HTMLElement>(':root')!.style.setProperty('--primary-second-color',res[1].value);

  }
  errorToastr() {
  }
}
