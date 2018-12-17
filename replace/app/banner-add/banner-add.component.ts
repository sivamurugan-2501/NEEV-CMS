import { Component, OnInit } from '@angular/core';

import { BannerServiceService } from './../services/banner-service.service';
import { Title } from '@angular/platform-browser';


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
    linkedTo : 0    
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
  
  constructor(private bannerService : BannerServiceService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
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
      this.bannerService.postNewBanner(banner).subscribe(
        response => {
          this.actionStatus=1;
          this.successMessage = "New banner added successfully";
          alert(response);
        },
        error => {
          this.actionStatus = 2;
          this.errorMessage = "Something went wrong";
        }
      
      );
      
  }

  onFileChange(event){
    const file = this.bannerData.file = event.target.files[0];
    
  }

}
