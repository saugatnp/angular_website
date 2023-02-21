import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PageContentService } from '../../services/pagecontent.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show: boolean = true;
  isLoggedIn: any;
  userName: any;
  id: number = 0
  constructor(private router: Router,
    private content: PageContentService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

        if (event.url.includes('Admin')) {
          this.show = false

        }
        else
          this.show = true
      }
    });

    this.getContent()
  }
  logOff() {

  }
  getContent() {
    this.content.getPageContent().subscribe({
      next: (value) =>
        this.storeContent(value),
      error: (err) => console.log(err)


    })
  }

  aboutList:any = []
  deptList:any = []
  servicesList:any = []
  storeContent(value: any) {
    this.aboutList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "about" && x.published == true)
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80) {
      document.querySelector('#site-header')!.classList.add('nav-fixed')
      document.querySelector('#top-header')!.classList.add('no-disp');
    } else {
      document.querySelector('#site-header')!.classList.remove('nav-fixed')
      document.querySelector('#top-header')!.classList.remove('no-disp');

    }

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
