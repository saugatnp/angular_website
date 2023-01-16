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
  selectedImage:string=''
  onSelectImage(x:any){
    // console.log(x)
    this.selectedImage=x;
    localStorage.setItem('img',this.selectedImage);
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
