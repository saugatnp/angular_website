import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PageContentService } from '../../services/pagecontent.service';
import { SpecialityService } from '../../services/speciality.service';

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
    private content: PageContentService,
    private specialityService:SpecialityService) { }

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
    this.getDeptList()
  }


  data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  getColumns(): any[] {
    var count = this.deptList.length/2;
    if(count<=6){
      count=4
    }
    else if(count>=6){
      count=6
    }
    const numCols = Math.ceil(this.deptList.length / count); // calculate the number of columns needed
    const columns = [];

    for (let i = 0; i < numCols; i++) {
      const start = i * count;
      const end = start + count;
      const column = this.deptList.slice(start, end);
      columns.push(column);
    }

    return columns;
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


  getDeptList() {
    this.specialityService.getSpecialityList().subscribe({
      next: (value) =>
        this.storeDeptList(value),
      error: (err) => console.log(err)


    })
  }

  storeDeptList(res:any){
this.deptList=res;

this.deptList = this.deptList.filter((x: {  published: boolean }) =>  x.published == true)

  }




  aboutList:any = []
  deptList:any = []
  servicesList:any = []
  packagesList:any=[]
  vacancyList:any=[]
  storeContent(value: any) {
    this.aboutList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "about" && x.published == true);
    this.servicesList=value.filter((x: { page_group: string, published: boolean }) => x.page_group === "services" && x.published == true);
    this.packagesList=value.filter((x: { page_group: string, published: boolean }) => x.page_group === "packages" && x.published == true);
    this.vacancyList=value.filter((x: { page_group: string, published: boolean }) => x.page_group === "careers" && x.published == true);

  }

  gotoPageMultipleParam(x:any){
    this.router.navigate(['/Page/'+x.sp_id+'/'+x.detail]);

  }

  gotoPage(x:any){

    this.router.navigate(['/Page/'+x]);
    // location.reload();
  }

  gotoBlogs(x:any){

    this.router.navigate(['/Blogs']);
    // location.reload();
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
