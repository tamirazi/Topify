import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LazyLoadImageModule } from 'ng-lazyload-image';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ListComponent } from './home/dashboard/list/list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Duration } from './pipes/duration.pipe';
import { FollowersPipe } from './pipes/followers.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ApiInterceptor } from './services/http-interceptor';
import { SlickNavComponent } from './slick-nav/slick-nav.component';
import { WelcomeComponent } from './home/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListComponent,
    LoginComponent,
    HomeComponent,
    Duration,
    FollowersPipe,
    SafeUrlPipe,
    SlickNavComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
    LazyLoadImageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
