import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { DoctorsService } from '../../services/doctors.service';
import { PageContentService } from '../../services/pagecontent.service';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  baseUrl = ''
  content: any = []
  param: any = ''
  param1: any = ''

  title: string = ''
  constructor(private router: Router,
    private activated: ActivatedRoute,
    public appconfig: JsonAppConfigService,
    private contentService: PageContentService,
    private refererService: DoctorsService,

    private http: HttpClient
  ) {

    this.baseUrl = appconfig.baseUrl;

    this.param = this.activated.snapshot.paramMap.get('id');

    this.param1 = this.activated.snapshot.paramMap.get('id2');



    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
this.content.page_group="events"
    this.getContent()

window.scroll(0,0)

  }
  ngOnChanges() {

  }

  contents: any = []
  getContent() {
    this.contentService.getPageContent().subscribe({
      next: res => this.storeContent(res),
      error: err => console.log(err)
    })
  }

  storeContent(res: any) {

    // this.contents = res;
    this.contents = res.filter((epic: { page_group: string; published:boolean}) => epic.page_group == this.content.page_group && epic.published==true);
    // this.content = res.filter((epic: { page_group: string; published:boolean}) => epic.page_group == "blogs" && epic.published==true)[0];

    // this.selectedContent = this.content;
    // console.log(this.content);



    // if (this.content.page_group == "about") {
    //   this.contents = res.filter((epic: { page_group: string;published:boolean }) => epic.page_group == this.content.page_group && epic.published==true );
    //   // this.getDoctorList();
    // }
    // if (this.content.page_group == "services") {
    //   this.contents = res.filter((epic: { page_group: string;published:boolean }) => epic.page_group == this.content.page_group && epic.published==true );
    //   // this.getDoctorList();
    // }



    this.getPicture();


    // console.log(this.content)
  }


  selectedContent: any = []
  selectContent(content: any) {
    window.scroll(0,0)
    // console.log(content);
    this.selectedContent = content
    this.content = content;
    this.getPicture()
  }


  getPicture() {
    var token = localStorage.getItem('access_token');
    // var userId = this.authorize.getUserId();
    const baseUrl = this.baseUrl;
    var demourl = 'api/OnlineAppointmentRequestFile?userid=' + this.content.sn +
      '&sn=' + this.content.sn +
      '&file_type=' + this.content.page_group
    this.http.get(baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + this.content.sn + "&sn=" + this.content.sn +
      "&file_type=" + this.content.page_group
      // baseUrl + demourl
      , { headers: { Authorization: 'Bearer ' + token } })
      .subscribe({

        next: data => this.storePic(data),
        error: res => console.log(res)

      }
      )
  }


  fileList: any = [];
  fileLink: any = [];
  storePic(res: any) {
    // console.log(res);
    this.fileList = res;
    this.fileList = this.fileList.filter((x: { published: boolean; }) => x.published === true);

    if (this.fileList.length !== 0) {
      const baseUrl = this.baseUrl;

      this.fileLink =
        baseUrl + '/api/OnlineUploadFileDownload?userid=' + this.content.sn + '&sn=' + this.content.sn
      // '&file_type=ANGULAR'
      // fileLink = this.baseUrl + 'api/OnlineUploadFileDownload?userid='+vm.selectedBlog.sn+'&sn='+vm.selectedBlog.sn;
      // $scope.fileType = 'SERVICES';
    }
    else {
      this.fileLink = 'assets/images/banner1.jpg'
    }


  }


  doctorsList: any = []
  getDoctorList() {
    this.refererService.getDoctorList().subscribe({
      next: res => this.storeDoctors(res),
      error: err => console.log(err)
    })
  }


  storeDoctors(res: any) {
    this.doctorsList = res.filter((epic: { sp_id: number; }) => epic.sp_id == this.param);
  }


  
  errorHandler(event:any) {
    // (event.target as HTMLImageElement).style.display = 'none';
    console.debug(event);
    event.target.src = "https://www.hamrodoctor.com/image.php?src=/uploads/hospitals/5e53652a04e48.png&w=60&h=60  "
 }



}
