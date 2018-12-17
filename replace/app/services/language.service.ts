import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) {

   }

   getLanguages(){
     const url= CONFIGS.apiBaseURL+CONFIGS.apiURLs["configs"]["language"];
     this.http.get(url);
   }

}
