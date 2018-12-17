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
}
