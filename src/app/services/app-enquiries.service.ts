import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AppEnquiriesService {

  constructor(private http : HttpClient) { }

  get(){
    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["app_enq"]["list"];
    return this.http.get(url);
  }
}
