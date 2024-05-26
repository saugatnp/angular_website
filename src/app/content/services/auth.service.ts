import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer } from "rxjs";
import { Router } from "@angular/router";
import { BroadcastService } from "./broadcast.service";
@Injectable({ providedIn: 'root' })

export class AuthService {

    data: any;
    admin:any;
    dataChange: Observable<any>;
    dataChangeObserver: any;
    tokenPartition: any;
    tokenBody: any;

    normaluser  : string = '';
    userValue: any;

    loginadmin : any;
    loginadminchange:Observable<any>;
    loginadminchangeobserver:any;
    userRoles: string[] = [];


  constructor(private router:Router,
    
    ) {
    this.dataChange = new Observable((observer:Observer<any>)=> {
        this.dataChangeObserver = observer;
      });
      
      this.loginadminchange = new Observable((observer:Observer<any>)=> {
        this.loginadminchangeobserver = observer;
      });

    }  



    checkTokenValidity() {
        var token = localStorage.getItem('access_token');

        if (token === null || token === undefined) {
            return false;
        }

        this.tokenPartition = token.split('.');

        if (this.tokenPartition.length === 3) {
            var tokenBase64Body = this.tokenPartition[1];
            this.tokenBody = JSON.parse(atob(tokenBase64Body));

            if (this.tokenBody.exp !== null || this.tokenBody.exp !== '') {
                var currentDateTime = new Date().getTime() / 1000;

                if (this.tokenBody.exp < currentDateTime) {
                    return false;
                }
            }
        }
        else {
            return false;
        }

        return true;
    }



    getUser() {
        this.checkTokenValidity();
        if (this.tokenBody !== null && this.tokenBody !== undefined) {

      //   this.setData({ attr: this.tokenBody.nameid });
        // this.setData()
        return (this.tokenBody.nameid);
        }
    }


    getUserId() {
      this.checkTokenValidity();
      if (this.tokenBody !== null && this.tokenBody !== undefined) {
      return (this.tokenBody.sub);
      }
  }
    setRoles(Roles: string[]){
      this.userRoles = Roles.slice(0);
    }
  
    getRoles(){
      return this.userRoles;


    }




    getUserRoles() {
        var roles :any= [];

        if (this.tokenBody !== null && this.tokenBody !== undefined) {
          return roles = this.tokenBody.role.slice(0);
        }

      

    }


    // checkAdmin(){
    //   if(this.getUserRoles().includes('admin')){
    //     this.broadcast.changeAdmin(true);
    //   }
    //   if(this.getUserRoles().includes('mr')){
    //     this.broadcast.changeMr(true);
    //   }
    // }



    logOff() {
        this.clearToken();
      //  this.router.navigate(['/login']);
        // this.setData(false);
        //this.
    }


    clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('firm');
        localStorage.removeItem('init');
        localStorage.removeItem('final');



      //  this.setData(false);
    }



}