import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Medipro';
  show: boolean = true;

  constructor(private router: Router,) { }
  ngOnInit(): void {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

        if (event.url.includes('Admin')) {
          this.show=false

        }
        else 
          this.show = true
      }
    });
  }
  // @HostListener('window:scroll', ['$event']) 
  // onScroll(event : Event) {
  //     if (document.body.scrollTop > 80 ||     
  //       document.documentElement.scrollTop > 80) {
  //       document.querySelector('#site-header')!.classList.add('nav-fixed')
  //       document.querySelector('#top-header')!.classList.add('no-disp');
  //     } else {
  //       document.querySelector('#site-header')!.classList.remove('nav-fixed')
  //       document.querySelector('#top-header')!.classList.remove('no-disp');
  
  //     }
   
  // }
   topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
