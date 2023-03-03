import { Injectable } from "@angular/core";
import { AppConfiguration } from './app-config';
import { HttpClient } from '@angular/common/http';
import { last, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class JsonAppConfigService extends AppConfiguration {
    constructor(private http: HttpClient) {
        super();
    }

    load() {

        return firstValueFrom(this.http.get<AppConfiguration>("assets/config/app.config.json")).then(
            data=>{
                this.title = data.title;
                this.baseUrl= data.baseUrl;
                this.localUrl=data.localUrl;
                this.onlineLabUrl=data.onlineLabUrl;
            }
        ).catch(()=>{
            console.error('cannot load config')
        })

  
    }





}