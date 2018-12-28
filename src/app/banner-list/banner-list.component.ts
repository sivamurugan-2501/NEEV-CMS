import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BannerServiceService } from '../services/banner-service.service';
import { BannerlistRequest } from '../model/bannerlist-request';
import { BannerlistResponse, BannerData } from '../model/bannerlist-response';
import {ConstantsData} from './../constants-data';
import { Route, Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopupsComponent, NgbdModalComponent } from '../custom-popups/custom-popups.component';

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

  bannerData: Array<Object>;

  actionStatus: number = -1;
  successMessage = "Success";
  errorMessage = "Something went wrong.";
  noRecordMessage = ConstantsData.noBannerMessage;

  popUpObject : NgbdModalComponent;
  
  constructor(private authService:AuthService, private bannerService: BannerServiceService, private route:Router,config: NgbModalConfig, private modalService: NgbModal) { 

    this.popUpObject = new NgbdModalComponent(modalService);

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

  deleteThis(id, index) {

    //const response = this.popUpObject.open(ConstantsData.ARE_YOU_SURE, ConstantsData.DELETE_BANNER_CONFIRMATION);
    
    const confirmation = confirm("Are you sure, that you want to delete this banner ?");


    if(confirmation){
      this.bannerService.deleteBanner(id).subscribe(
        (response:Response) => {  
          if(response.status == 200){
            this.actionStatus=1;
            this.successMessage = "Banner deleted successfully";
            this.bannerData.splice(index,1);
          }
        },
        (error) => {
            this.actionStatus = 2;
            this.errorMessage = "Something went wrong";
        }
      );
    }
  }

  editThis(id){
    this.route.navigate(["main", "edit-banner"], {"queryParams" : {"id": id} });
  }

}


