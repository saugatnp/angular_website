import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAboutComponent } from './admin-about.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedDirective } from 'src/app/content/directives/shared.directive';



@NgModule({
  declarations: [
    AdminAboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    SharedDirective

  ]
})
export class AdminAboutModule { }
