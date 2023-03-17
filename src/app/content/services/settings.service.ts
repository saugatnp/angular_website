import { HttpClient } from "@angular/common/http";
import { Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AppConfiguration } from "src/config/app-config";
import { SettingsGroup } from "../pages/admin/settings/settings.model";
import { BroadcastService } from "./broadcast.service";

@Injectable({
    providedIn: 'root'
})


export class SettingsService {


    baseUrl: string;


    constructor(
        public http: HttpClient,
        private Config: AppConfiguration,
        private broadCast: BroadcastService,
        protected _sanitizer: DomSanitizer
    ) {
        this.baseUrl = Config.localUrl;
    }



    ngOnInit(): void {
        this.getSettings();
    }



    getSettings() {

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




    settings = new SettingsGroup()
    successGet(res: any) {
        res.map((x: { name: string; value: any; published: boolean; }) => {
            Object.keys(this.settings).map(y => {
                if (y == x.name && x.published == true) {
                    this.settings[y as keyof SettingsGroup] = x.value
                    // if(x.value.startsWith('http')){
                    //     this.settings[y as keyof SettingsGroup] = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this._sanitizer.bypassSecurityTrustResourceUrl(x.value))!;
                    // }

                }
            })
        })
        this.broadCast.changeSettings(this.settings);
    }



    errorToastr() {
    }



}