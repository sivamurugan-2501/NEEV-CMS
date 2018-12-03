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
          component : MainPageComponent
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
    MainPageComponent
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
