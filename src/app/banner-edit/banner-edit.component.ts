import { Component, OnInit } from '@angular/core';

import { BannerServiceService } from './../services/banner-service.service';
import { Title } from '@angular/platform-browser';
import { elementStyleProp } from '@angular/core/src/render3/instructions';
import { timeout } from 'q';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {

  title = "Banner : Edit";
  typeOptions = [
     {name :"File", value: 1},
     {name :"URL", value: 2}
  ]

  bannerData:any = {
    caption : null,
    type : 1,
    path: null,
    file: null,
    hasLink : 0,
    linkedTo : 0,
    status: null,
    file_to_delete: null
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

  instanceId :number;
  error = 0;

  previewImage = null;
  imageRemoved=0;
  file_id;
  file_to_delete:Array<Object> = new Array();

  constructor(private bannerService : BannerServiceService, private titleService: Title, private route: Router, private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    //alert(JSON.stringify(this.aRoute.queryParams));
    this.aRoute.queryParams.subscribe(
      (params) => {
        this.instanceId = params["id"];
        if(isNaN(this.instanceId)){
          this.error =1;
        }else{
          this.loadData();
          
        }
      }
    );
  }

  loadData(){
    const id = this.instanceId;
    this.bannerService.getBannerById(id).subscribe(
      (response: any) =>{
        if(response.status == 200){
            this.bannerData = response.data;
            this.createPreview(response["baseURL"]);
        }
      } 
    );
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
        }else if(keys[i]!=="status" )
        {
          banner.append(keys[i], this.bannerData[keys[i]]);
        }
        const file_del_id: any = (this.file_to_delete[0]) ? this.file_to_delete[0] :null ;
        banner.append("file_to_delete", file_del_id);
        //console.log(banner);
      }
      //console.log(banner);

      //return false;
      const __this = this;
      this.bannerService.editBanner(banner, this.instanceId).subscribe(
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


  createPreview(baseURL){
    const image = baseURL+""+ this.bannerData.file;
    this.previewImage = image;
  }

  removeFile(){
      this.imageRemoved =1;
      this.file_id = this.bannerData.file_id;
      this.bannerData.file_id = null;
      this.file_to_delete.push(this.bannerData.file_id);
  }

  undoRemoved(){
    this.imageRemoved=0;
    this.file_to_delete.pop();
    this.bannerData.file_id = this.file_id;
  }


}