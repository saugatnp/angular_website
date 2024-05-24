import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Config } from '../configfile';
import { Observable } from 'rxjs';
import { AppConfiguration } from 'src/config/app-config';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  // ngOnInit(){

  // }
baseUrl : any;
  constructor(public http: HttpClient,
    private Config:JsonAppConfigService,
    private titleService:Title) {
      this.baseUrl = Config.baseUrl;

     }
  acCodeList: any = '';



setTitle(newTitle: string) {
  this.titleService.setTitle(newTitle);
}




}