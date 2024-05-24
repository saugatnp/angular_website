import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { AppConfiguration } from "src/config/app-config";
import { PageContent } from "../pages/admin/admin-about/pagecontent.model";


@Injectable({
    providedIn: 'root'
})



export class PageContentService {
    baseUrl: string;

    constructor(public http: HttpClient,
        private Config: AppConfiguration) {
        this.baseUrl = Config.baseUrl;

    }


    getPageContent() {
        const token = localStorage.getItem('access_token');
        const options = {
            'headers': { 'Authorization': 'Bearer' + token }
        }
        return this.http.get(this.baseUrl + "api/Pagecontent", options)
    }


    postContent(hero: any): Observable<any> {
        const token = localStorage.getItem('access_token');
        const options = {
            'headers': { 'Authorization': 'Bearer' + token }
        }
        return this.http.post<PageContent>("api/PageContent", hero, options)
      
    }


}