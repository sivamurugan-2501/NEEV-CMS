import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import {  Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CONFIGS } from './../config';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  postVideo(videoData){
    return this.http.post(CONFIGS.apiBaseURL+CONFIGS.apiURLs["video"]["add"], videoData);
  }

  postProductVideo(videoData, productId){
    return this.http.post(CONFIGS.apiBaseURL+CONFIGS.apiURLs["video"]["add"]+"/"+productId, videoData);
  }

  getVideoList(payload){
    return this.http.post(CONFIGS.apiBaseURL+CONFIGS.apiURLs["video"]["list"],payload);
  }

  deleteVideo(id){

       return this.http.delete(CONFIGS.apiBaseURL+CONFIGS.apiURLs["video"]["delete"]+"/"+id);

  }

  getVideoById(id){
      return this.http.get(CONFIGS.apiBaseURL+CONFIGS.apiURLs["video"]["get"]+"/"+id);
  }

  updateVideo(id:number, videoData){
    return this.http.post(CONFIGS.apiBaseURL+CONFIGS.apiURLs["video"]["update"]+"/"+id, videoData);
  }

}
