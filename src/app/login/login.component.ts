import { Component, OnInit } from '@angular/core';
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
  constructor(private authService: AuthService, private strService : StorageService) { }

  ngOnInit() {
  }

  checkCredentials(){
    alert(JSON.stringify(this.loginForm));
    this.authService.checkCredentials(this.loginForm).subscribe( (response : AuthResponse) => {
       if(response.status == "200" && response.authentication == true){
          this.strService.storeUserData(response.userData);
          this.strService.setToken(response.appToken);
          alert("Login Successful.");
       }
    });
    return false;
  }

}
