import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    ServicesComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
  ]
})
export class ServicesModule { }
