import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageRoutes } from 'src/app/routing/routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(PageRoutes)
  ]
})
export class AboutModule { }
