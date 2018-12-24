import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private storageService: StorageService, private authService: AuthService, private route:Router) { }

  userData:any;
  user_first_name;
  user_last_name;
  user_email;

  ngOnInit() {

    const userData:any = this.storageService.getUserData();
    try{
      this.userData = JSON.parse(userData);
      this.user_first_name = this.userData.first_name;
      this.user_last_name = this.userData.last_name;
      this.user_email = this.userData.email;
      //alert( this.userData);
    }catch(e){
      this.userData= userData;
    }

  }

  logout(){

    const confirmation =confirm("Are you sure you want to logout ?");
    if(confirmation){
      this.authService.logout();
      this.route.navigate(["login"]);
    }
  }

}
