import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private authService: AuthService, private route:Router) { }

  ngOnInit() {

    if(this.authService.checkIfLoggedIn()){
     
      this.route.navigate(["main", "add-banner"]);
    
    }else{
      
      this.route.navigate(["login"]);
    
    }

  }

}
