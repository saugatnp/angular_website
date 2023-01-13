import { Injectable } from "@angular/core";
import { AppConfiguration } from './app-config';
import { HttpClient } from '@angular/common/http';
import { last, lastValueFrom,firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class JsonAppConfigService extends AppConfiguration {
    constructor(private http: HttpClient) {
        super();
    }

    load() {

        return firstValueFrom(this.http.get<AppConfiguration>("assets/config/app.config.json"))
        .then((data:any) => {
         this.title = data.title;
         this.baseUrl= data.baseUrl;
         this.localUrl=data.localUrl;
     })
     
     .catch(()=>{
         console.error('cannot load config')
     })
    //   const data= lastValueFrom(urls.pipe())
    //   console.log(data)
        // .subscribe(data=>{
        //     this.title = data.title;
        //     this.baseUrl= data.baseUrl;
        //     this.localUrl=data.localUrl;
        // })
        // .catch(()=>{
        //     console.error('cannot load config')
        // })
        // return lastValueFrom(urls)
    }

    // loadvalue() {
    //     this.title = data.title;
    //     this.baseUrl = data.baseUrl;
    //     this.localUrl = data.localUrl;
    // }




}