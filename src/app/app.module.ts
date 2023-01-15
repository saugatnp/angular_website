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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(mainRoutes),
    NgbModule,
    NoopAnimationsModule,
    MatStepperModule,
    AdminModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule
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
