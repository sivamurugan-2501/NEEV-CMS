import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ConfigsDataService {

  constructor(private http: HttpClient) {

  }

  getLanguages(){
    const url= CONFIGS.apiBaseURL+CONFIGS.apiURLs["configs"]["language"];
    return this.http.get(url);
  }

  getRoles(){
    const url= CONFIGS.apiBaseURL+CONFIGS.apiURLs["configs"]["roles"];
    return this.http.get(url);
  }

  getRegions(){
    const url= CONFIGS.apiBaseURL+CONFIGS.apiURLs["configs"]["regions"];
    return this.http.get(url);
  }

  
  getStates(){
    const url= CONFIGS.apiBaseURL+CONFIGS.apiURLs["configs"]["states"];
    return this.http.get(url);
  }



}
