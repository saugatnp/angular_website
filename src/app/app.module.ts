import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { mainRoutes } from './routing/routes';
import { FooterComponent } from './content/shared/footer/footer.component';
import { HeaderComponent } from './content/shared/header/header.component';
import { AboutComponent } from './content/pages/about/about.component';
import { NgbCarousel, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { AdminComponent } from './content/pages/admin/admin.component';
import { AdminModule } from './content/pages/admin/admin.module';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { AppConfiguration } from 'src/config/app-config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { PageComponent } from './content/pages/page/page.component';
import { DoctorsComponent } from './content/pages/doctors/doctors.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogsComponent } from './content/pages/blogs/blogs.component';
import { LabreportdownloadComponent } from './content/pages/labreportdownload/labreportdownload.component';
import { SharedDirective } from './content/directives/shared.directive';
import { ModalComponent } from './content/modal/modal.component';

export function initializerFn(jsonappconfig: JsonAppConfigService) {
  return () => {
    return jsonappconfig.load();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    PageComponent,
    DoctorsComponent,
    BlogsComponent,
    LabreportdownloadComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(mainRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatStepperModule,
    AdminModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    NgSelectModule,
    SharedDirective
  ],
  providers: [
    {
      provide: AppConfiguration,
      deps: [HttpClient],
      useExisting: JsonAppConfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializerFn,
      deps: [JsonAppConfigService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
