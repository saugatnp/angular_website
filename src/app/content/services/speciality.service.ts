import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfiguration } from "src/config/app-config";


@Injectable({
    providedIn: 'root'
  })

  
  
  export class SpecialityService{
    baseUrl: string;

    constructor(public http: HttpClient,
        private Config: AppConfiguration) {
        this.baseUrl = Config.baseUrl;
    
      }


      getSpecialityList() :  Observable<any>  {
        const token = localStorage.getItem('access_token');
        const options = {
            'headers': { 'Authorization': 'Bearer' + token }
        }
        return this.http.get(this.baseUrl + "api/GetWebSpeciality", options)
    }




      


      

  }