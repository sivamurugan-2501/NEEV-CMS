import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerListComponent } from './banner-list/banner-list.component';
//import {LocalStorageModule} from 'angular-local-storage';


const routes: Routes =[
  {
      path: '',
      children: [
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path : 'forgot-password',
          component: ForgotPasswordComponent
        },
        {
          path : 'main',
          component : MainPageComponent,
          children : [
            {
               path: "add-banner",
               component : BannerAddComponent
            },
            {
              path : 'banner-list',
              component : BannerListComponent
            }
          ]
        },
        {
          path: "add-banner",
          component : BannerAddComponent
        }
      ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SidemenuComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    BannerAddComponent,
    BannerListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    //LocalStorageModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
