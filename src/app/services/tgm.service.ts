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

  getUsers_1(role, fields){

    let queryString="";
    if(role!==undefined && role!="" && role!=null ){
      queryString = "?role="+role;
    }

    if(fields!==undefined && fields!="" && fields!=null ){
      queryString+= "&fields="+fields;
    }

    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["user"]["list"];
    return this.http.get(url+queryString);

  }

  getUserById(userid){
    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["user"]["get"];
    return this.http.get(url+"/"+userid);
  }

  updateUser(userid, tgmData){

    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["user"]["update"];
    return this.http.post(url+"/"+userid,tgmData );

  }

  deleteUser(userid){
    
    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["user"]["delete"];
    return this.http.delete(url+"/"+userid );
  }

  importUser(userDatas){
    
    const url =CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["user"]["import"];
    return this.http.post(url,userDatas );

  }


  authenticate(payload){
 
    const url = CONFIGS.apiBaseURL+CONFIGS["apiURLs"]["user"]["login"];
    return this.http.post(url, payload);

  }

  checkOTP(payload){
    const url = CONFIGS.apiBaseURL+CONFIGS["apiURLs"]["user"]["validateOTP"];
    return this.http.post(url, payload);
  }

  checkRole(forRole, userid){

    const url = CONFIGS.apiBaseURL+CONFIGS["apiURLs"]["user"]["checkRole"]+"/"+userid+"?role="+forRole;
    return this.http.get(url);
  }

}
