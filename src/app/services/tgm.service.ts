import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class TgmService {

  constructor(private http:HttpClient) { }

  addTGM(tgmData){

    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["user"]["add"];
    return this.http.post(url, tgmData);

  }

  getUsers(role){

    let queryString="";
    if(role!==undefined && role!="" && role!=null ){
      queryString = "?role="+role;
    }
    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["user"]["list"];
    return this.http.get(url+queryString);

  }

}
