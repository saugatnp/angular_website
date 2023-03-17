import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { SharedDirective } from '../../directives/shared.directive';
import { SafePipe } from '../../pipe/safe.pipe';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    CarouselModule,
    SharedDirective,
    
  ]
})
export class HomeModule { }
