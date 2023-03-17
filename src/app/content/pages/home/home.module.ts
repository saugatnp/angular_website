import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { SharedDirective } from '../../directives/shared.directive';
<<<<<<< HEAD
import { SafePipe } from '../../pipe/safe.pipe';
=======
import { DoctorCardComponent } from '../../shared/doctorcard/doctorcard.component';
import { SharedModule } from '../../shared/shared/shared.module';
>>>>>>> a1efeb2735f2623ff96348422fd8d4a598491d8e



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
<<<<<<< HEAD
    
=======
    SharedModule
>>>>>>> a1efeb2735f2623ff96348422fd8d4a598491d8e
  ]

})
export class HomeModule { }
