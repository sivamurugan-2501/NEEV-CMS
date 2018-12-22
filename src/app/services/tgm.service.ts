import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class TgmService {

  constructor(private http:HttpClient) { }

  addTGM(tgmData){

    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["tgm"]["add"];
    return this.http.post(url, tgmData);

  }

}
