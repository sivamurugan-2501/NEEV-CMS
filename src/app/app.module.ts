import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { NgxEditorModule } from 'ngx-editor';




import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { VideoAddComponent } from './video-add/video-add.component';
import { ActionMessageComponent } from './action-message/action-message.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { VideoListComponent } from './video-list/video-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BannerEditComponent } from './banner-edit/banner-edit.component';

//import {LocalStorageModule} from 'angular-local-storage';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'http://localhost/NEEV/CMS/public/uploadFiles',
   method: 'Post',
   maxFilesize: 50,
   acceptedFiles: 'image/*',
   autoProcessQueue: false
 };
 

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
            },
            {
              path: 'edit-banner',
              component: BannerEditComponent
            },
            {
              path : "add-video",
              component : VideoAddComponent
            },
            {
              path : "video-list",
              component : VideoListComponent
            },
            {
              path : "add-product",
              component : ProductAddComponent
            },
            {
              path : "product-list",
              component : ProductListComponent
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
    BannerListComponent,  
    VideoAddComponent, ActionMessageComponent, ProductAddComponent, VideoListComponent, ProductListComponent, BannerEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DropzoneModule,
    NgxEditorModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    CookieService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
