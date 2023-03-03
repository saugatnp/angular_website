import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  dataChangeObservera: any;
  data: any;
  selectedFirm: any;

  initdate: any;
  finaldate: any;
  initobserver: any;
  finalobserver: any;
  loggedin: boolean = this.auth.checkTokenValidity();
  loggedInAdmin = false; //this.auth.getUserRoles().includes('admin');
  loggedInAsMr = false;//this.auth.getUserRoles().includes('mr');
  pageSelected: string = '';
  moduleSelected: string = '';

  firms: any;



  constructor(private auth: AuthService,
) {


    // this.firmService.getFirmFromServer().subscribe(x =>
    //   this.selectedFirm = x[0]
    // )
    // this.changeFirm(this.selectedFirm);
  }

  //init observer
//   private initSub = new BehaviorSubject<string>(this.date.getInitDate())
//   currentInit = this.initSub.asObservable();

//   changeInit(newinit: string) {
//     this.initSub.next(newinit);
//   }


  //LIS OGGED IN  
  private dataSub = new BehaviorSubject<boolean>(this.loggedin);
  currentData = this.dataSub.asObservable();

  changeData(newObj: boolean) {
    this.dataSub.next(newObj);
  }

  //LOGGED IN AS ADMIN 
  private adminlog = new BehaviorSubject<boolean>(this.loggedInAdmin);
  currentloggedAdmin = this.adminlog.asObservable();
  changeAdmin(newObj: boolean) {
    this.adminlog.next(newObj);
  }

  //loGGED IN AS MR
  private mrlog = new BehaviorSubject<boolean>(this.loggedInAsMr);
  currentloggedMr = this.mrlog.asObservable();
  changeMr(newObj: boolean) {
    this.mrlog.next(newObj);
  }

  //Page Url
  private onpageselected = new BehaviorSubject<string>(this.pageSelected);
  currentPage = this.onpageselected.asObservable();
  changePage(newObj: string) {
    this.onpageselected.next(newObj);
  }

  //NAVIGATION DYNAMIC Url
  private onModuleSelected = new BehaviorSubject<string>(this.moduleSelected);
  currentModule = this.onModuleSelected.asObservable();
  changeModule(newObj: string) {
    this.onModuleSelected.next(newObj);
  }





}