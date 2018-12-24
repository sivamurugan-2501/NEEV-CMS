import { Component, OnInit } from '@angular/core';

import { BannerServiceService } from './../services/banner-service.service';
import { Title } from '@angular/platform-browser';
import { elementStyleProp } from '@angular/core/src/render3/instructions';
import { timeout } from 'q';
import { Router, Event } from '@angular/router';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.css']
})
export class BannerAddComponent implements OnInit {

  title = "Banner : Add";
  typeOptions = [
     {name :"File", value: 1},
     {name :"URL", value: 2}
  ]

  bannerData = {
    caption : null,
    type : 1,
    path: null,
    file: null,
    hasLink : 0,
    linkedTo : 0,
    region:0,
    language:0
  }

  linkToList = {
      "products"  : [
          "Product 1",
          "Product 2"
      ],
      "events" : [
         "Events 1",
         "Events 2"
      ]

  }

  actionStatus: number = -1;
  successMessage = "Success";
  errorMessage = "Something went wrong.";
  imageError = null;
  regions;
  languages;

  constructor(private storageService: StorageService , private bannerService : BannerServiceService, private titleService: Title, private route: Router) { }

  ngOnInit() {

    const region = this.storageService.getCustomData("REGIONS");

    try{
      this.regions = JSON.parse(region);
    }catch(e){
      this.regions = region;
    }

    const languages = this.storageService.getCustomData("LANGUAGES");
    try{
      this.languages = JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }
    //this.titleService.setTitle(this.title);
  }

  saveBanner(){
      var banner = new FormData();
      
      let keys = Object.keys(this.bannerData);
    
      for(let i=0;i<keys.length;i++){
        //alert(this.bannerData[keys[i]]);
        if(keys[i] == "file"){
          if(this.bannerData["type"]==1){
            
            let file = this.bannerData[keys[i]];
            banner.append(keys[i], file, file["name"]);
          
          }else{

            banner.append(keys[i], null);

          }
        }else{
          banner.append(keys[i], this.bannerData[keys[i]]);
        }
        
      }
      const __this = this;
      this.bannerService.postNewBanner(banner).subscribe(
        response => {
          this.actionStatus=1;
          this.successMessage = "New banner added successfully";
          const redirect = function(){ __this.route.navigate(["main", "banner-list"]); };
          setTimeout(function(){
            redirect();
          }, 4000);
        },
        error => {
          this.actionStatus = 2;
          this.errorMessage = "Something went wrong";
        }
      
      );
      
  }

  onFileChange(event){
    
    this.bannerData.file = null;
    this.imageError = null;
    const file: File  = event.target.files[0];
    const type = file.type;
    try{
      const extension = type.split("/")[1];
      if(["png", "jpeg", "jpg"].indexOf(extension.toLocaleLowerCase()) > -1){
        this.bannerData.file = file;
      }else{
        this.imageError = "Invalid image file, only .png, .jpg and  .jpeg are accepted.";
        return false;
      }
    }catch(e){
      console.log(e);
    }
  }

}
