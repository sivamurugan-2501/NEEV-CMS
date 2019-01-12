import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class VasService {

  constructor(private http: HttpClient) { }

  add(vasData){

    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["vas"]["add"];
    return this.http.post(url, vasData);
  
  }


  get(){

    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["vas"]["list"];
    return this.http.get(url);

  }


  delete(id){
    
    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["vas"]["delete"]+"/"+id;
    return this.http.delete(url);

  }

  getById(id){
    
    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["vas"]["get"]+"/"+id;
    return this.http.get(url);

  }

  edit(vas,id){

    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["vas"]["update"]+"/"+id;
    return this.http.post(url, vas);

  }


}
