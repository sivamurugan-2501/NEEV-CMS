import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../services/auth.service';

import { AuthResponse } from './../model/auth-response';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = {
    username : null,
    password : null
  }

  actionStatus = -1;

  successMessage: String = null;  //"Success.";
  errorMessage: String = null; //"Error";

  constructor(private authService: AuthService, private strService : StorageService, private route : Router) { }

  ngOnInit() {
  }

  checkCredentials(){

    this.authService.checkCredentials(this.loginForm).subscribe( 
      
      (response : AuthResponse) => {

          if(response.status == "200" && response.authentication == true){

              this.strService.storeUserData(JSON.stringify(response.userData));
              this.strService.setToken(response.appToken);
              this.actionStatus = 1;
              this.successMessage = response.message;
              this.route.navigate(["main", "add-banner"]);

          }else if(response.authentication == false){

              this.actionStatus = 2;
              this.errorMessage = response.message;
            
          }
      },

      (error) => {
        this.actionStatus = 2;
        this.errorMessage = "Something went wrong..";
      }
    
    );
    return false;
  }

}
