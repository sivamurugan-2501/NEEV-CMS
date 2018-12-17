import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import {  Router } from '@angular/router';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private storageService: StorageService, private route: Router) { }

  checkCredentials(userCredentials){
    return this.http.post(CONFIGS.apiBaseURL+ CONFIGS.apiURLs["authenticate"], userCredentials);
  }

  checkIfLoggedIn(){

      if(this.storageService.getToken()){
       // alert("Logged in already");
        
      }else{
        this.route.navigate(["../login"]);
        alert("Login to continue");
      }
      
  }

  redeemUser(appToken){

  }

  loginUserData(){
     return this.storageService.getUserData();
  }

}
