import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BannerServiceService } from '../services/banner-service.service';
import { BannerlistRequest } from '../model/bannerlist-request';
import { BannerlistResponse, BannerData } from '../model/bannerlist-response';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {

  userData;
  userId;
  serverBaseURL;
  payload : BannerlistRequest = {
    requestor : null,
    maximum : null,
    source :null,
    status : null
  };

  bannerData;

  constructor(private authService:AuthService, private bannerService: BannerServiceService) { 

    this.userData  = authService.loginUserData();

    try{
      this.userData = JSON.parse(this.userData);
      this.userId = this.userData["id"];
    }catch(e){

    }

  }

  ngOnInit() {  
    this.loadData();
  }

  loadData(){
    

    this.payload.requestor = this.userId;
    this.payload.source =1;
    this.payload.maximum = null;
    this.payload.status = 1;

    this.bannerService.getBannerList(this.payload).subscribe( (response: BannerlistResponse) => {
        if(response.status == 200){
          this.serverBaseURL =  response.baseURL;
          this.bannerData = response.banners;
        }
    });
  }

}


