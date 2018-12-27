import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  addEvent(eventData){

    const url = CONFIGS["apiBaseURL"]+ CONFIGS["apiURLs"]["event"]["add"];
    return this.http.post(url, eventData);
  }

  getEvents(){

    const url = CONFIGS["apiBaseURL"]+ CONFIGS["apiURLs"]["event"]["list"];
    return this.http.get(url);
  }

  deleteById(id){

    const url = CONFIGS["apiBaseURL"]+ CONFIGS["apiURLs"]["event"]["delete"]+"/"+id;
    return this.http.delete(url);
  }

  getById(id){

    const url = CONFIGS["apiBaseURL"]+ CONFIGS["apiURLs"]["event"]["get"]+"/"+id;
    return this.http.get(url);

  }

  updateEvent(id){

    const url = CONFIGS["apiBaseURL"]+ CONFIGS["apiURLs"]["event"]["update"]+"/"+id;
    return this.http.get(url);

  }
}
