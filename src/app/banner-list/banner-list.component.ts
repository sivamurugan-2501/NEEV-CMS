import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BannerServiceService } from '../services/banner-service.service';
import { BannerlistRequest } from '../model/bannerlist-request';
import { BannerlistResponse, BannerData } from '../model/bannerlist-response';
import {ConstantsData} from './../constants-data';
import { Route, Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { StorageService } from '../services/storage.service';
import { NgbdModalComponent2 } from '../multipurpose-popup/multipurpose-popup.component';

declare function setDataTable():any;

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
  bannerData_actual : Array<Object>;

  actionStatus: number = -1;
  successMessage = "Success";
  errorMessage = "Something went wrong.";
  noRecordMessage = ConstantsData.noBannerMessage;

  popUpObject : NgbdModalComponent;
  multipPopup : NgbdModalComponent2;

  regions: any=0;
  region_selected = 0;
  
  constructor(private storageService: StorageService, private authService:AuthService, private bannerService: BannerServiceService, private route:Router,config: NgbModalConfig, private modalService: NgbModal) { 

    this.popUpObject = new NgbdModalComponent(modalService);
    this.multipPopup = new NgbdModalComponent2(modalService);

    this.userData  = authService.loginUserData();

   

    try{
      this.userData = JSON.parse(this.userData);
      this.userId = this.userData["id"];
    }catch(e){

    }

  }

  ngOnInit() {  
    this.loadData();

    const regions =this.storageService.getCustomData("REGIONS");
    try{
      this.regions = JSON.parse(regions);
    }catch(e){
      this.regions = regions;
    }
    
    setDataTable();
  }

  loadData(){
    
    
    this.payload.requestor = this.userId;
    this.payload.source =1;
    this.payload.maximum = null;
    this.payload.status = 1;

    this.bannerService.getBannerList(this.payload).subscribe( (response: BannerlistResponse) => {
        if(response.status == 200){
          this.serverBaseURL =  response.baseURL;
          this.bannerData =  this.bannerData_actual = response.banners;
        }
    });
  }

  testFn(id){
    alert(id);
  }

  deleteThis(id, index) {

    const response = this.popUpObject.open(ConstantsData.ARE_YOU_SURE, ConstantsData.DELETE_BANNER_CONFIRMATION, {
      "callback" : this.delete,
      "params" : [id, index, this]});
    
    const confirmation = 1; //confirm("Are you sure, that you want to delete this banner ?");


    if(confirmation){
      /* this.bannerService.deleteBanner(id).subscribe(
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
      );*/
    } 
  }

  // used as callback function in custompopup component
  delete(id, index, __this){
  
    __this.bannerService.deleteBanner(id).subscribe(
      (response:Response) => {  
        if(response.status == 200){
          __this.actionStatus=1;
          __this.successMessage = "Banner deleted successfully";
          __this.bannerData.splice(index,1);
        }
      },
      (error) => {
        __this.actionStatus = 2;
        __this.errorMessage = "Something went wrong";
      }
    );
  }
  


  editThis(id){
    this.route.navigate(["main", "edit-banner"], {"queryParams" : {"id": id} });
  }

  filterData(){
    //alert(this.region_selected);
    const region = this.region_selected;
    const data = this.bannerData.filter( (data:any, index, arr) => {
       // alert(JSON.stringify(data));
        return (data.region == region)
    });
    console.log(data);
  }

  filterAsRegion(){
    const region = this.region_selected;
    if(region> 0 ){
      this.bannerData = this.bannerData_actual.filter( (data:any) => {
         //alert(JSON.stringify(data));
         return (data.region == region );
      });
    }else{
      this.bannerData = this.bannerData_actual;
    }

  }


  linkedToText(linkedTo){

    if(linkedTo==1){
      return "Product";
    }else if(linkedTo==2){
      return "Videos";
    }else if(linkedTo==3){
      return "Event";
    }else{
      return "-";
    }

  }


  viewImage(imageSource){
      this.multipPopup.open(1, imageSource);
  }


}


