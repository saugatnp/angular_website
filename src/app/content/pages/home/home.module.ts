import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { SharedDirective } from '../../directives/shared.directive';
import { SafePipe } from '../../pipe/safe.pipe';
import { DoctorCardComponent } from '../../shared/doctorcard/doctorcard.component';
import { SharedModule } from '../../shared/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    // DoctorCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    CarouselModule,
    SharedDirective,
    SharedModule
  ]

})
export class HomeModule { }
