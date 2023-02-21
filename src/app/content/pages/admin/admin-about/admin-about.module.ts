import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAboutComponent } from './admin-about.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    AdminAboutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule

  ]
})
export class AdminAboutModule { }
