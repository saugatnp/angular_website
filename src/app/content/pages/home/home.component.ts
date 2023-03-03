import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppConfiguration } from 'src/config/app-config';
import { DoctorsService } from '../../services/doctors.service';
import { PageContentService } from '../../services/pagecontent.service';

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
  constructor(private router: Router,
    private doctorService: DoctorsService,
    public appconfig: AppConfiguration,
    public pagecontent: PageContentService,
    private http: HttpClient) {

    doctorService.getDoctorList().subscribe({
      next: x => this.doctors = x,
      error: err => console.log(err)
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
    event.target.src = "https://www.hamrodoctor.com/image.php?src=/uploads/hospitals/5e53652a04e48.png&w=60&h=60  "
  }




  getContent() {
    this.pagecontent.getPageContent().subscribe({
      next: (value) =>
        this.storeContent(value),
      error: (err) => console.log(err)


    })
  }


  aboutList: any = []
  deptList: any = []
  homepageList: any = []
  servicesList: any = []
  storeContent(value: any) {
    this.aboutList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "about" && x.published == true);
    this.servicesList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "services" && x.published == true);
    this.homepageList = value.filter((x: { page_group: string, published: boolean }) => x.page_group === "homepage" && x.published == true);
    

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
        error: res => console.log(res)

      }
      )
  }


  fileList: any;
  fileLink: any;
  storePic(res: any) {
    // console.log(res);
    this.fileList = res;
    const baseUrl = this.appconfig.baseUrl;

    this.fileLink =
      baseUrl + '/api/OnlineUploadFileDownload?userid=' + 101 + '&sn=' + 101

  }

  


  redirectToService(index: number) {
    if (index % 2 == 0) {
      this.router.navigateByUrl("/Service/(ServiceName:ServiceOne/)")
      // console.log("%2")
    }
    else {
      // console.log("no %2")

      this.router.navigateByUrl("/Service/(ServiceName:ServiceTwo)")
    }

  }
  
  selectedImage: string = ''
  onSelectImage(x: any) {
    this.router.navigate(['/Page/'+x]);

    // console.log(x)
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
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    items: 2,
    autoplay: true,
    autoWidth: true,
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

}
