import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonAppConfigService } from 'src/config/json-app-config.service';

@Injectable({
  providedIn: 'root'
})
export class MaxSnService {
  // ngOnInit(){

  // }
  baseUrl : any;
  constructor(public http: HttpClient,
    private Config:JsonAppConfigService) {
      this.baseUrl = Config.baseUrl;

     }  

  maxSn: any = '';


  getMaxSn(tablename:any,fieldname:any): Observable<any>{
    const token = localStorage.getItem('access_token');
    const options = {
      'headers': { 'Authorization': 'Bearer'+ token}
    }
    return this.http.get(this.baseUrl+ 'api/maxnum?tablename='+tablename+'&fieldname='
    +fieldname,options);

};

}