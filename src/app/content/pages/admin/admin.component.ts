import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.css']

})
export class AdminComponent implements OnInit {
  isLoggedIn: any;
  userName:any;
  id: number = 0
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.cdRef.detectChanges();}
  logOff(){

  }
  division = [
    {
      id: 1,
      name: 'Home',
      class: 'fas fa-home custom-fa',
    },
    {
      id: 2,
      name: 'About',
      class: 'fas fa-user',

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
      id: 6,
      name: 'Posts',
      class: 'fas fa-clipboard',

    },
    {
      id: 7,
      name: 'Page',
      class: 'fas fa-file',

    },
    {
      id: 8,
      name: 'News And Events',
      class: 'fas fa-newspaper',

    },
  ]
  showSub(id: number) {
    if (id == 1) {
      
    }
    else if (id == 2) {
      
    }
    
    this.id = id
   
  }

}
