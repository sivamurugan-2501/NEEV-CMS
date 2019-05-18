import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http:HttpClient) { }

  getStats(state){
    let queryString = "";
    if(state>0){
      queryString = "?state="+state;
    }
    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["dashboard"]["stats"];
    return this.http.get(url + queryString );

  }

}
