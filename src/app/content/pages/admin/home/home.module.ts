import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from 'src/app/routing/admin-routes';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { SharedDirective } from 'src/app/content/directives/shared.directive';



@NgModule({
  declarations: [
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CKEditorModule,
    SharedDirective
  ]
})
export class HomeModule { }
