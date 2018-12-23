import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private http: HttpClient) { }

  add(dealerData){

    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["dealer"]["add"]
    return this.http.post(url, dealerData);
    
  }

}
