import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { getLocaleDateTimeFormat } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  lifetime = 60*24; //in minutes - 1 day
  expiryTime = null;

  constructor(private localStorage: LocalStorage, private cookieService: CookieService) {

      this.expiryTime = this.makeExpirationTime();

   }

  storeUserData(userData){
    localStorage.setItem('cmsUserData', userData);
    this.cookieService.set("cmsUserData",userData, this.expiryTime);
  }

  setToken(appToken){
    localStorage.setItem('cmsAppToken', appToken);
    this.cookieService.set("cmsUserData",appToken, this.expiryTime);
  }

  getToken(){
    return localStorage.getItem("cmsAppToken");
  }
  
  getUserData(){
    return localStorage.getItem("cmsUserData");
  }

  makeExpirationTime(){
    let d = new Date();
    d.setMinutes(d.getMinutes() + this.lifetime);
    return d; 
  }

  redeemCookie(){

      const cmsAppToken = this.cookieService.get("cmsAppToken");
      const cmsUserData = this.cookieService.get("cmsUserData");
      this.setToken(cmsAppToken);
      this.storeUserData(cmsUserData);

  }

}
