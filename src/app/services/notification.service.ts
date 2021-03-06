import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  sendNotification(notificationData){

    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["notification"]["send"];
    return this.http.post(url, notificationData);

  }

  getActiveNotifications(){

    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["notification"]["list"];
    return this.http.get(url);
  }

  deleteNotification(id){

    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["notification"]["delete"]+"/"+id;
    return this.http.delete(url);

  }



}
