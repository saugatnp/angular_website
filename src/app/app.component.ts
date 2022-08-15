import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Medipro';
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event : Event) {
      if (document.body.scrollTop > 80 ||     
        document.documentElement.scrollTop > 80) {
        document.querySelector('#site-header')!.classList.add('nav-fixed')
        document.querySelector('#top-header')!.classList.add('no-disp');
      } else {
        document.querySelector('#site-header')!.classList.remove('nav-fixed')
        document.querySelector('#top-header')!.classList.remove('no-disp');
  
      }
   
  }
   topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
