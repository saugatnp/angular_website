import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppConfiguration } from 'src/config/app-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  newImages = [
    'https://scontent.fbwa1-1.fna.fbcdn.net/v/t31.18172-8/21366619_1917466775243425_3471185600271085063_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=7cHaS7B2jZAAX_nNvjr&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfC8uDVotDCneDUaeL5Tgeu4ZBmK0k2YHTvwEohyvsZjlA&oe=63F06D33',
    'https://scontent.fbwa1-1.fna.fbcdn.net/v/t39.30808-6/242698248_3106452196344871_3145026289251624003_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=Lxx35f29v0gAX8BOQ28&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfCayeUeSIZdCudSdQ4l9dZbZZLxUOTGLmvP1v11VBjTCQ&oe=63CDA242',
    'https://scontent.fbwa1-1.fna.fbcdn.net/v/t39.30808-6/270774588_3182864935370263_6227456734189255812_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=db41JLNRreIAX8-WXwM&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfB5qGt4osYpxq4UsOtSLI4ubJagMqxDesL5ilaeRVd9jQ&oe=63CDC5DC'
  ]
  service = [
    {
      name: 'Medical Department',
      image: 'https://scontent.fbwa1-1.fna.fbcdn.net/v/t39.30808-6/277674963_3247016085621814_6156537813936942794_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=9dOHyYJAL68AX9BQIZL&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfDlmjtSbjOmXIWHzk2HeKJ6ice7ayZbkSKeU7iCoT1kfg&oe=63CE9762',
      text: 'Department of Medical Oncology at Nepal Cancer Hospital & Research Centre Pvt. Ltd covers a very varied clinical spectrum and offeres the highest quality and advanced oncology care in a supportive and compassionate environment to all our patients for the treatment and prevention of cancers through the protocal-based approach and onnovative reseach.',
      link: ''
    },
    {
      name : 'Surgical Department',
      image : 'https://scontent.fbwa1-1.fna.fbcdn.net/v/t39.30808-6/270774588_3182864935370263_6227456734189255812_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=db41JLNRreIAX8-WXwM&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfB5qGt4osYpxq4UsOtSLI4ubJagMqxDesL5ilaeRVd9jQ&oe=63CDC5DC',
      text : 'Surgery is a medical specialty that uses operative manual and instrumental techniques on a patient to investigate or treat a pathological condition such as a disease or injury, to help improve bodily function or appearance or to repair unwanted ruptured areas.',
      link : ''
    },
    {
      name : 'Radiotherapy Deparment',
      image : 'https://scontent.fbwa1-1.fna.fbcdn.net/v/t39.30808-6/269977273_3182864708703619_2963793404533299723_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=my89RMYFLJQAX_YNaY-&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfCEE6s_Ji9mUtIpMB448E44NceX3Q_gl0zaM_-1muamdQ&oe=63CDDF29',
      text : 'Radiation therapy or radiotherapy, often abbreviated RT, RTx, or XRT, is therapy using ionizing radiation, generally as part of cancer treatment to control or kill malignant cells and normally delivered by a linear accelerator.',
      link : ''
    },
    {
      name : 'Pathology',
      image : 'https://scontent.fbwa1-1.fna.fbcdn.net/v/t31.18172-8/22859713_1944000375923398_3617661858024490318_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=5wzh6mOV4O8AX-01f2k&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfDwOmjORQGvx1qZfJDJdbnFwIk66wTer5bYufSjWUbnnw&oe=63F074B0',
      text : 'Pathology is the study of the processes underlying diseases & other forms of illness, harmful abnormality, or dysfunction. Within biology but also a branch of medicine, it means specifically the study & diagnosis of the structural with functional changes in cells, tissues & organs that underlie diseases.',
      link : ''
    },
    {
      name : 'Radiology Department',
      image : 'https://scontent.fbwa1-1.fna.fbcdn.net/v/t31.18172-8/21457384_1917472075242895_907798514835343020_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=8fK_gKNoNtoAX_C8MSz&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfCDLDp6slHIZoIwDy3n8_rg1zfe7S9w-mEpBZaLVqiT9w&oe=63F099D1',
      text : 'Radiology is the medical specialty that uses medical imaging to diagnose and treat diseases within the bodies of both humans and animals.',
      link : ''
    },
    {
      name : 'Administrative Deparment',
      image : 'https://scontent.fbwa1-1.fna.fbcdn.net/v/t39.30808-6/270774588_3182864935370263_6227456734189255812_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=db41JLNRreIAX8-WXwM&_nc_ht=scontent.fbwa1-1.fna&oh=00_AfB5qGt4osYpxq4UsOtSLI4ubJagMqxDesL5ilaeRVd9jQ&oe=63CDC5DC',
      text : 'Governance of the NCHRC is headed by Executive Chairman. Medical Director and Chief Executive Officer are leaders of clinical and non-clinical divisions respectively. Hospital/General Administration of the NCHRC is led by Chief Executive Officer. The hospital administration is composed of several units with incharges. They are Finance, Human Resources (HR), Administration, Sales and Business Promotion (SBP), Procurement, General Store (GS), Information Technology (IT), Hospital Operations (HO), Repair, Maintenance & Engineering (RME), Biomedical Engineering (BME) and other support service units viz. Housekeeping and Laundry, Medical Records (MR), Transportation, Legal, Public Relations (PR), Helpdesk/Reception, Cash Unit, Charity Unit (Bipanna Nagarik Ausadhi Upachar Kosh), Hospital Waste Management (HWM), Food Services, Security and many more. Quality Department (QD) is directed by Executive Chairman. All incharges of the units are certified internal quality auditors (ISO 9001:2015). Everyday 60+ employees passionately work under Hospital Administration Department to achieve goal of the organization.A pioneer in world class health care system, Nepal Cancer Hospital strives to put well experienced and dedicated Administrative staffs to run comprehensive health care system.',
      link : ''
    }
  ]
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
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
    // console.log(x)
    this.selectedImage = x.image;
    localStorage.setItem('img', this.selectedImage);
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
