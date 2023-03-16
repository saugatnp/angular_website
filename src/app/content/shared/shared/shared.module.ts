import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { DoctorCardComponent } from '../doctorcard/doctorcard.component';
import { FormsModule } from '@angular/forms';
import { SharedDirective } from '../../directives/shared.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    
    DoctorCardComponent,
    ModalComponent,

 

  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    SharedDirective
  ],
  exports:[
    DoctorCardComponent,
    ModalComponent
  ]
})
export class SharedModule { }
