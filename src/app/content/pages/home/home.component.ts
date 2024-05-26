import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbModal, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { interval, startWith } from 'rxjs';
import { AppConfiguration } from 'src/config/app-config';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from '../../modal/modal.config';
import { BroadcastService } from '../../services/broadcast.service';
import { DoctorsService } from '../../services/doctors.service';
import { PageContentService } from '../../services/pagecontent.service';
import { SettingsGroup } from '../admin/settings/settings.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  baseUrl: string = '';
  settings = new SettingsGroup()

  logoUrl: any

  constructor(private router: Router,
    private doctorService: DoctorsService,
    public appconfig: AppConfiguration,
    public pagecontent: PageContentService,
    private http: HttpClient,
    private BroadCastservice: BroadcastService,
    private modalService: NgbModal,
    private broadcastService: BroadcastService
  ) {
    this.broadcastService.currentLogo.subscribe({
      next: data => {
        this.logoUrl = data
      }
    })

    this.baseUrl = this.appconfig.baseUrl;

    doctorService.getDoctorList().subscribe({
      next: x => this.doctors = x,
      error: err => console.error(err)
    })




    this.BroadCastservice.currentSettings.subscribe((dataSub: any) => {
      this.settings = dataSub;
    })


    this.getSliderImageList();
    this.getContent();
  }

  doctors: any = []
  ngOnInit(): void {
  }

  errorHandler(event: any) {
    // (event.target as HTMLImageElement).style.display = 'none';
    console.debug(event);
    // event.target.src = this.fileLink;
    event.target.src = this.logoUrl
  }

  goToLink(x: any) {
    window.open(x.page_text, '_blank');
  }



  getContent() {
    this.pagecontent.getPageContent().subscribe({
      next: (value) =>
        this.storeContent(value),
      error: (err) => console.error(err)


    })
  }


  aboutList: any = []
  deptList: any = []
  homepageList: any = []
  servicesList: any = []
  packagesList: any = []
  clientsList: any = []
  modalsList: any = []
  modalData: any = []
  selectedIndex: number = 0;
  storeContent(value: any) {
    this.aboutList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "about" && x.published == true);
    this.servicesList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "services" && x.published == true);
    this.homepageList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "homepage" && x.published == true);
    this.packagesList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "packages" && x.published == true);
    this.clientsList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "clients" && x.published == true);
    this.modalsList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "modals" && x.published == true);

    if (this.modalsList.length != 0) {

      for (const [key, value] of Object.entries(this.modalsList)) {

        this.modalData.push(value)


        this.openModal(parseInt(key))

      }


      // for (let i = 0; i <= this.modalData.length - 1; i++) {

      //   setTimeout(() => {
      //     this.selectedIndex=i;
      //     this.openModal(i)
      //   }, 1000);
      // }

    }

  }
  modalConfig !: ModalConfig

  @ViewChild('startModal', { static: true }) content1!: TemplateRef<any>;
  @ViewChild('startModal1', { static: true }) content2!: TemplateRef<any>;
  @ViewChild('startModal2', { static: true }) content3!: TemplateRef<any>;



  async openModal(i: number) {

    // this.selectedIndex = i
    if (i == 0) {
      this.modalService.open(this.content1, { size: 'lg', centered: true, animation: true })
    }

    if (i == 1) {
      this.modalService.open(this.content2, { size: 'lg', centered: true, animation: true })
    }
    if (i == 2) {
      this.modalService.open(this.content3, { size: 'lg', centered: true, animation: true })
    }
  }





  getSliderImageList() {
    var token = localStorage.getItem('access_token');
    // var userId = this.authorize.getUserId();
    const baseUrl = this.appconfig.baseUrl;
    var demourl = 'api/OnlineAppointmentRequestFile?userid=' + 101 +
      '&sn=' + 101 +
      '&file_type=sliders'
    this.http.get(baseUrl + "/api/OnlineAppointmentRequestFile?userid=" + 101 + "&sn=" + 101 + "&file_type=sliders"
      // baseUrl + demourl
      , { headers: { Authorization: 'Bearer ' + token } })
      .subscribe({

        next: data => this.storePic(data),
        error: res => console.error(res)

      }
      )
  }

  modalImageLink = this.appconfig.baseUrl + '/api/OnlineUploadFileDownload?userid='
  // + 101 + '&sn=' + 101



  fileList: any;
  fileLink: any;
  storePic(res: any) {

    this.fileList = res;
    this.fileList = res.filter((x: { page_group: string, published: boolean }) => x.published == true);
    const baseUrl = this.appconfig.baseUrl;

    this.fileLink =
      baseUrl + '/api/OnlineUploadFileDownload?userid=' + 101 + '&sn=' + 101

  }




  redirectToService(index: number) {
    if (index % 2 == 0) {
      this.router.navigateByUrl("/Service/(ServiceName:ServiceOne/)")
    }
    else {

      this.router.navigateByUrl("/Service/(ServiceName:ServiceTwo)")
    }

  }

  selectedImage: string = ''
  onSelectImage(x: any) {
    this.router.navigate(['/Page/' + x]);

    this.selectedImage = x.image;
    // localStorage.setItem('img', this.selectedImage);
  }

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rewind: true,
    navSpeed: 500,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    items: 3,
    autoplay: true,
    autoWidth: false,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      1000: {
        items: 3,
      }
    },
    nav: true
  }
  // getSettings() {
  //   const token = localStorage.getItem('access_token');
  //   const options = {
  //     'headers': { 'Authorization': 'Bearer' + token }
  //   }
  //   var postUrl = 'api/GetSettingsDetailByName';
  //   this.http.get(this.baseUrl + postUrl, options)
  //     .subscribe(
  //       {
  //         next: res => this.successGet(res),
  //         error: res => this.errorToastr(),

  //       })
  // }
  // settings = new SettingsGroup()
  // successGet(res: any) {
  //   res.map((x: { name: string; value: any; published: boolean; }) => {
  //     Object.keys(this.settings).map(y => {
  //       if (y == x.name && x.published == true) {
  //         this.settings[y as keyof SettingsGroup] = x.value

  //       }
  //     })
  //   })
  // }
  // errorToastr() {
  //   // this.toastr.error('Error', 'Error')
  // }

}
