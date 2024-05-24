import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from 'src/app/routing/admin-routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './department/department.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedDirective } from '../../directives/shared.directive';
import { AdminDoctorsComponent} from './doctors/doctors.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SlidersComponent } from './sliders/sliders.component';
import { ServicesComponent } from './services/services.component';
import { AdminblogsComponent } from './adminblogs/adminblogs.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AdminComponent,
    DepartmentComponent,
    AdminDoctorsComponent,
    SlidersComponent,
    ServicesComponent,
    AdminblogsComponent,
    LoginComponent,
    ContentComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes),
    CKEditorModule,
    SharedDirective,
    Ng2SearchPipeModule,
    NgSelectModule,

  ],
  exports : [
    AdminComponent
  ]
})
export class AdminModule { }
