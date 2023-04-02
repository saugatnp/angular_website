import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from '../../modal/modal.config';
import { AppointmentModel } from '../../models/appointment.model';
import { DoctorsService } from '../../services/doctors.service';
import { PageContentService } from '../../services/pagecontent.service';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  baseUrl = ''
  content: any = []
  param: any = ''
  param1: any = ''
  param2:any=''

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
    this.param2 = this.activated.snapshot.paramMap.get('id3');




    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
    window.scroll(0, 0)

    this.getContent()

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
    this.contents=res;

if(this.param!='' )
{
    this.content = res.filter((epic: { page_title: string; }) => epic.page_title == this.param)[0];
  }

if(this.param1!='' && this.param2==''){

  this.content = res.filter((epic: { page_title: string; }) => epic.page_title == this.param1)[0];

}
if(this.param2=='' && this.param2==''){

  this.content = res.filter((epic: { page_title: string; }) => epic.page_title == this.param1)[0];

}



    if(this.param==="careers"){
    this.contents = res.filter((epic: { page_group: string; }) => epic.page_group == this.param);

    }
    


    if (this.content.page_group == "departments") {
      this.getDoctorList();
      this.contents = []

    }

    if (this.content.page_group == "doctors") {
      this.getDoctorList();

      // this.contents = []

    }

    // this.getDoctorList();

    // if(this.param2!=''){

    // }
    
   

    if (this.content.page_group == "about") {
      this.contents = res.filter((epic: { page_group: string; published: boolean }) => epic.page_group == this.content.page_group && epic.published == true);
      // this.getDoctorList();
    }
    if (this.content.page_group == "services") {
      this.contents = res.filter((epic: { page_group: string; published: boolean }) => epic.page_group == this.content.page_group && epic.published == true);
      // this.getDoctorList();
    }

    else if (this.content.page_group != null) {
      this.contents = res.filter((epic: { page_group: string; published: boolean }) => epic.page_group == this.content.page_group && epic.published == true);

    }

    this.getPicture();


    // console.log(this.content)
  }


  selectedContent: any = []
  selectContent(content: any) {
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
  doctorLink=''
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

this.doctorLink= 
    this.baseUrl + '/api/OnlineUploadFileDownload?userid=' + this.param + '&sn=' + this.param +
    '&filenames=' + this.param + '.png&extension=.png&file_type=' + this.content.page_group;

    // else {
    //   this.fileLink = 'assets/images/banner1.jpg'
    // }


  }


  doctorsList: any = []
  getDoctorList() {
    this.refererService.getDoctorList().subscribe({
      next: res => this.storeDoctors(res),
      error: err => console.log(err)
    })
  }

  
  @ViewChild('modal') private modalComponent!: ModalComponent

  async openModal() {
    this.modalConfig = { modalTitle: 'Book  ' + this.doctor.referer, closeButtonLabel: 'End' }
    return await this.modalComponent.open()
  }





  doctor:any=[]
  storeDoctors(res: any) {
    this.doctorsList = res.filter((epic: { sp_id: number; }) => epic.sp_id == this.param);

    this.doctor= res.filter((epic: { refid: number; }) => epic.refid == this.param)[0];
  }


  modalConfig!:ModalConfig
  appointmentData:AppointmentModel=new AppointmentModel();


  errorHandler(event: any) {
    // (event.target as HTMLImageElement).style.display = 'none';
    console.debug(event);
    event.target.src = "https://www.hamrodoctor.com/image.php?src=/uploads/hospitals/5e53652a04e48.png&w=60&h=60  "
  }



}
