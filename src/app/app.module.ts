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

import { DatepickerModule } from 'ngx-bootstrap/datepicker';


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

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserUplaodsComponent } from './user-uplaods/user-uplaods.component';

import { FaqAddComponent } from './faq-add/faq-add.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { TgmAddComponent } from './tgm-add/tgm-add.component';
import { DealerAddComponent } from './dealer-add/dealer-add.component';
import { TgmListComponent } from './tgm-list/tgm-list.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { EventAddComponent } from './event-add/event-add.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { CustomPopupsComponent, NgbdModalComponent} from './custom-popups/custom-popups.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
import { FaqEditComponent } from './faq-edit/faq-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserImportComponent } from './user-import/user-import.component';
import { MultipurposePopupComponent, NgbdModalComponent2 } from './multipurpose-popup/multipurpose-popup.component';
import { BusinessOpporAddComponent } from './business-oppor-add/business-oppor-add.component';
import { BusinessOpporListComponent } from './business-oppor-list/business-oppor-list.component';
import { BusinessoppEditComponent } from './businessopp-edit/businessopp-edit.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { VasAddComponent } from './vas-add/vas-add.component';
import { VasListComponent } from './vas-list/vas-list.component';
import { VasEditComponent } from './vas-edit/vas-edit.component';
import { ApplicationEnquiriesComponent } from './application-enquiries/application-enquiries.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SafeURLPipe } from './pipes/safe-url.pipe';

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
              path : "edit-video",
              component : VideoEditComponent
            },
            {
              path : "add-product",
              component : ProductAddComponent
            },
            {
              path : "product-list",
              component : ProductListComponent
            },
            {
              path : "edit-product",
              component : ProductAddComponent
            },
            {
              path : "event-list",
              component : EventListComponent
            },
            {
              path : "edit-event",
              component : EventEditComponent
            },
            {
              path: "user-uploads",
              component: UserUplaodsComponent
            },
            {
              path: "add-faq",
              component : FaqAddComponent
            },
            {
              path : "edit-faq",
              component : FaqEditComponent
            },
            
            {
              path : "faq-list",
              component : FaqListComponent
            },
            {
              path : "add-user",
              component : TgmAddComponent
            },
            {
              path : "edit-user",
              component : UserEditComponent
            },
            {
              path : "add-tgm",
              component : TgmAddComponent
            },
            {
              path : "user-list",
              component : UserListComponent
            },
            {
              path: "user-import",
              component : UserImportComponent
            },
            {
              path : "add-dealer",
              component : DealerAddComponent
            },
            {
              path : "add-event",
              component : EventAddComponent
            },
            {
              path : 'create-notification',
              component : SendNotificationComponent
            },
            {
              path : 'notification-list',
              component : NotificationListComponent
            },{
              path: 'add-business-opportunity',
              component : BusinessOpporAddComponent
            },
            {
              path : 'business-oppportunit-list',
              component: BusinessOpporListComponent
            },
            {
              path : 'edit-business-opportunity',
              component: BusinessoppEditComponent
            },{
              path: 'add-vas',
              component: VasAddComponent
            },
            {
              path : 'vas-list',
              component : VasListComponent
            },
            {
              path : 'edit-vas',
              component : VasEditComponent
            },
            {
              path : 'application-enquiries',
              component : ApplicationEnquiriesComponent
            },
            {
              path : 'dashboard',
              component : DashboardComponent
            }
          ]
        },
        {
          path: "**",
          component : PageNotFoundComponent
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
    VideoAddComponent, ActionMessageComponent, ProductAddComponent, VideoListComponent, 
    ProductListComponent, BannerEditComponent, FaqAddComponent, UserUplaodsComponent, PageNotFoundComponent, FaqListComponent, UserAddComponent, UserListComponent, TgmAddComponent, DealerAddComponent, TgmListComponent, SendNotificationComponent, EventAddComponent, NotificationListComponent, EventListComponent, VideoEditComponent, EventEditComponent, 
    CustomPopupsComponent,
    NgbdModalComponent,
    NgbdModalComponent2,
    NotificationEditComponent,
    FaqEditComponent,
    UserEditComponent,
    UserImportComponent,
    MultipurposePopupComponent,
    BusinessOpporAddComponent,
    BusinessOpporListComponent,
    BusinessoppEditComponent,
    VasAddComponent,
    VasListComponent,
    VasEditComponent,
    ApplicationEnquiriesComponent,
    DashboardComponent,
    SafeURLPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DropzoneModule,
    NgxEditorModule,
    NgxSpinnerModule,
    DatepickerModule.forRoot(),
    NgbModule,
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
  entryComponents : [CustomPopupsComponent, MultipurposePopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
