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

  getVideoList(payload){
    return this.http.post(CONFIGS.apiBaseURL+CONFIGS.apiURLs["video"]["list"],payload);
  }


}
