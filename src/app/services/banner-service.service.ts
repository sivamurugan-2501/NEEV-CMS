import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import {  Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BannerServiceService {

    userData;
    userId;
    

   httpHeaders:HttpHeaders = new HttpHeaders({
      'Content-type' : ''
   });

  constructor(private http:HttpClient, private authService: AuthService) { 
      this.userData = authService.loginUserData();
      this.userId = this.userData["id"];
  }

  postNewBanner(bannerData){
    //alert("post");
    return this.http.post("http://localhost/NEEV/CMS/public/cms/banner/add", bannerData);
  }

  getBannerList(payload){

      return this.http.post("http://localhost/NEEV/CMS/public/cms/banner/list", payload);
  }

}
