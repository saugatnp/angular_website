import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/content/services/auth.service';
import { BroadcastService } from 'src/app/content/services/broadcast.service';
import { TitleService } from 'src/app/content/services/title.service';
import { AppConfiguration } from 'src/config/app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'Login';
  catid = '';
  category_name = '';
  category_description = '';
  published = '';
  index_page = '';
  narcotic = '';
  baseUrl :any;
  data :any=[];
  search: string = "";
  postbtn: boolean = true;
  formShown: boolean = false;
  closeResult = '';
  loggedInAsAdmin: any;
  
  loggedInAsMr: any;
  returnUrl!: string;

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    //}   this.getFromServer();
  }

  constructor(public http: HttpClient,
    private auth: AuthService,
    private service: BroadcastService,
    private router: Router,
    private titleService:TitleService,
    private route: ActivatedRoute,
    //NEW URL COPY FROM HERE
    private appConfig:AppConfiguration
    ) {
   this.baseUrl = appConfig.baseUrl;
   this.titleService.setTitle(this.title)
}
//UPTO HERE
//BASEURL:ANY DECLARE




  tryLogin() {
  //  this.ngxspinner.show()
    
    this.http.post(this.baseUrl + 'token', "userName=" + encodeURIComponent(this.data.userid) +
      "&password=" + encodeURIComponent(this.data.password) +
      "&grant_type=password",
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).subscribe(res => this
      .Success(res),
      res => this.Error(res));
  }


  Error(res: any) {
   // this.ngxspinner.hide()
    console.log(res);
    // this.notifyService.showError(res.statusText,this.title);
  }

  Success(res: any) {
   // this.ngxspinner.hide()

    // this.notifyService.showSuccess("Logged in successfully !",this.title);
    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('expiresIn', res.expires_in);
    this.auth.checkTokenValidity();
    this.service.changeData(this.auth.checkTokenValidity())
    
    

    this.loggedInAsAdmin = this.auth.getUserRoles().includes('admin');
    if (this.loggedInAsAdmin) {
      this.service.changeAdmin(true)
    }
    this.loggedInAsMr = this.auth.getUserRoles().includes('mr');
    if(this.loggedInAsMr){
      this.service.changeMr(true)
    }

    // this.router.navigate(['PharmacyDepartment/SalesSection/SalesOrderList'])
    this.router.navigate(['Admin/AdminHome']);

    // this.router.navigate(['Home'])


   




  }



  resetInput() {
    this.data = [];
  }

}