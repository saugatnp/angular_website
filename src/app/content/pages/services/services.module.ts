import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import {MatStepperModule} from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { serviceRoutes } from 'src/app/routing/service-routes';


@NgModule({
  declarations: [
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    RouterModule.forChild(serviceRoutes),

  ]
})
export class ServicesModule { }
