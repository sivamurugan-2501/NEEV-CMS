import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import {  Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CONFIGS } from './../config';


@Injectable({
  providedIn: 'root'
})
export class BannerServiceService {

    userData;
    userId ;
    

   httpHeaders:HttpHeaders = new HttpHeaders({
      'Content-type' : ''
   });

  constructor(private http:HttpClient, private authService: AuthService) { 
      this.userData = authService.loginUserData();
      this.userId = this.userData["id"];
  }

  postNewBanner(bannerData){
    //alert(CONFIGS);
    const url = CONFIGS["apiBaseURL"] + CONFIGS["apiURLs"]["banner"]["add"];
    return this.http.post(url, bannerData);
  }

  getBannerList(payload){

      const url = CONFIGS.apiBaseURL+CONFIGS.apiURLs["banner"]["list"]; 
      return this.http.post(url, payload);
  }

  deleteBanner(id){

    const url = CONFIGS.apiBaseURL+CONFIGS.apiURLs["banner"]["delete"];
    return this.http.delete(url+"/"+id);

  }


  getBannerById(id){

    const url = CONFIGS.apiBaseURL+CONFIGS.apiURLs["banner"]["get"];
    return this.http.get(url+"/"+id);

  }

  
}
