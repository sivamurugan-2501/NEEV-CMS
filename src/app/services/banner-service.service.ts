import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BannerServiceService {

   httpHeaders:HttpHeaders = new HttpHeaders({
      'Content-type' : ''
   });

  constructor(private http:HttpClient) { }

  postNewBanner(bannerData){
    //alert("post");
    return this.http.post("http://localhost/NEEV/CMS/public/cms/banner/add", bannerData);
  }

}
