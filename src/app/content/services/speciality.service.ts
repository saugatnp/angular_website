import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

      


      

  }