import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserUploadService {

  constructor(private http: HttpClient) { }

  getUploads(tgm_id, media){

      let queryStrings= "";
      if(tgm_id){
        queryStrings = "?tgm="+tgm_id;
      }else{
        queryStrings = "?tgm=0";
      }

      if(media){
        queryStrings+= "&media="+media;
      }else{
        queryStrings+= "&media=0";
      }

      const url = CONFIGS["apiBaseURL"] + CONFIGS["apiURLs"]["user_uploads"]["get"]+queryStrings;
      return this.http.get(url);

  }
}
