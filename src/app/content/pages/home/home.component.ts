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
    'https://www.nch.com.np/wp-content/uploads/2020/03/DSC_5369-min.jpg',
    'https://www.nch.com.np/wp-content/uploads/2021/01/1.gif',
    'https://www.nch.com.np/wp-content/uploads/2020/03/DSC_5390-2-min.jpg'
  ]
  service = [
    {
      name: 'Medical Department',
      image: 'https://www.nch.com.np/wp-content/uploads/2020/06/Medical-Oncologist-2-768x369.jpg',
      text: 'Department of Medical Oncology at Nepal Cancer Hospital & Research Centre Pvt. Ltd covers a very varied clinical spectrum and offeres the highest quality and advanced oncology care in a supportive and compassionate environment to all our patients for the treatment and prevention of cancers through the protocal-based approach and onnovative reseach.',
      link: ''
    },
    {
      name : 'Surgical Department',
      image : 'https://www.nch.com.np/wp-content/plugins/js_composer/assets/vc/no_image.png',
      text : 'Surgery is a medical specialty that uses operative manual and instrumental techniques on a patient to investigate or treat a pathological condition such as a disease or injury, to help improve bodily function or appearance or to repair unwanted ruptured areas.',
      link : ''
    },
    {
      name : 'Radiotherapy Deparment',
      image : 'https://www.nch.com.np/wp-content/uploads/2020/06/DSC_3880-768x354.jpg',
      text : 'Radiation therapy or radiotherapy, often abbreviated RT, RTx, or XRT, is therapy using ionizing radiation, generally as part of cancer treatment to control or kill malignant cells and normally delivered by a linear accelerator.',
      link : ''
    },
    {
      name : 'Pathology',
      image : 'https://www.nch.com.np/wp-content/uploads/2020/06/Pathology-and-Laboratory-Science-768x474.jpg',
      text : 'Pathology is the study of the processes underlying diseases & other forms of illness, harmful abnormality, or dysfunction. Within biology but also a branch of medicine, it means specifically the study & diagnosis of the structural with functional changes in cells, tissues & organs that underlie diseases.',
      link : ''
    },
    {
      name : 'Radiology Department',
      image : 'https://www.nch.com.np/wp-content/uploads/2020/06/Radiology-855x570.jpg',
      text : 'Radiology is the medical specialty that uses medical imaging to diagnose and treat diseases within the bodies of both humans and animals.',
      link : ''
    },
    {
      name : 'Administrative Deparment',
      image : 'https://www.nch.com.np/wp-content/plugins/js_composer/assets/vc/no_image.png',
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
