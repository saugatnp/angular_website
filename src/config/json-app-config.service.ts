import { Injectable } from "@angular/core";
import { AppConfiguration } from './app-config';
import { HttpClient } from '@angular/common/http';
import { last, lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class JsonAppConfigService extends AppConfiguration {
    constructor(private http: HttpClient) {
        super();
    }

    load() {

        const urls = this.http.get<AppConfiguration>("assets/config/app.config.json")

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