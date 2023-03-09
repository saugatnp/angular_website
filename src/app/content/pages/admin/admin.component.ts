import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BroadcastService } from '../../services/broadcast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.css']

})
export class AdminComponent implements OnInit {
  isLoggedIn: any;
  userName:any;
  id: number = 0
  constructor(private router: Router,
    private service:BroadcastService,
    private auth:AuthService) { 

      this.service.currentData.subscribe((dataSub: any) => {
        this.isLoggedIn = dataSub;
        // console.log(this.isLoggedIn);
        this.service.currentloggedAdmin.subscribe((data: any) => {
          this.loggedInAsAdmin = data;
          this.userName = this.auth.getUser()
        })
  
      })
  }
    loggedInAsAdmin=false;
    loggedIn=false;

  ngOnInit(): void {

   
  
}
  
  logOff(){
    this.auth.logOff();
    this.service.changeData(false)
    this.service.changeAdmin(false)
    this.router.navigate(['Admin/Login'])
    // this.router.pa

  }
  division = [
    {
      id: 1,
      name: 'Dashboard',
      class: 'fas fa-home custom-fa',
    },
    {
      id: 2,
      name: 'About',
      class: 'fas fa-user',

    },
    {
      id: 9,
      name: 'Slider',
      class: 'fas fa-image',

    },
    {
      id: 3,
      name: 'Services',
      class: 'fas fa-vials',

    },
    {
      id: 4,
      name: 'Departments',
      class: 'fas fa-pills',
    },
    {
      id: 5,
      name: 'Doctors',
      class: 'fas fa-user',

    },
    {
      id: 7,
      name: 'Packages',
      class: 'fas fa-gift',

    },
    // {
    //   id: 6,
    //   name: 'Blogs',
    //   class: 'fas fa-clipboard',

    // },
    
    // {
    //   id: 8,
    //   name: 'News And Events',
    //   class: 'fas fa-newspaper',

    // },
  ]
  showSub(id: number) {
    if (id == 1) {
      this.router.navigate(['Admin/AdminHome']);
    }
    else if (id == 2) {
      this.router.navigate(['Admin/AdminAbout']);
    }
    else if (id == 4) {
      this.router.navigate(['Admin/Departments']);
    }
    else if (id == 5) {
      this.router.navigate(['Admin/AdminDoctors']);
    }
    else if (id == 6) {
      this.router.navigate(['Admin/AdminBlogs']);
    }
    else if (id == 9) {
      this.router.navigate(['Admin/Sliders']);
    }
    else if (id == 3) {
      this.router.navigate(['Admin/AdminServices']);
    }
    else if (id == 7) {
      this.router.navigate(['Admin/AdminContent']);
    }
    
  
    
    this.id = id
   
  }

}
