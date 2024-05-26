import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { DoctorsService } from '../../services/doctors.service';
import { PageContentService } from '../../services/pagecontent.service';
import { BroadcastService } from '../../services/broadcast.service';


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
  logoUrl : any

  title: string = ''
  constructor(private router: Router,
    private activated: ActivatedRoute,
    public appconfig: JsonAppConfigService,
    private contentService: PageContentService,
    private refererService: DoctorsService,
    private http: HttpClient,
    private broadcastService : BroadcastService
  ) {
    this.broadcastService.currentLogo.subscribe({
      next: data => {
        this.logoUrl = data
      }
    })
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
      error: err => console.error(err)
    })
  }

  storeContent(res: any) {

    // this.contents = res;
    this.contents = res.filter((epic: { page_group: string; published:boolean}) => epic.page_group == this.content.page_group && epic.published==true);
   


    this.getPicture();


  }


  selectedContent: any = []
  selectContent(content: any) {
    window.scroll(0,0)
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
        error: res => console.error(res)

      }
      )
  }

  selectedImage:any=[]
  selectImage(x:any){
this.selectedImage=x;

  }

  fileList: any = [];
  fileLink: any = [];
  storePic(res: any) {
    
    this.fileList = res;
    this.fileList = this.fileList.filter((x: { published: boolean; }) => x.published === true);

    if (this.fileList.length !== 0) {
      const baseUrl = this.baseUrl;

      this.fileLink =
        baseUrl + '/api/OnlineUploadFileDownload?userid=' + this.content.sn + '&sn=' + this.content.sn
        this.selectedImage=this.fileList[0];
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
      error: err => console.error(err)
    })
  }


  storeDoctors(res: any) {
    this.doctorsList = res.filter((epic: { sp_id: number; }) => epic.sp_id == this.param);
  }


  
  errorHandler(event:any) {
    // (event.target as HTMLImageElement).style.display = 'none';
    console.debug(event);
    event.target.src = this.logoUrl
 }



}
