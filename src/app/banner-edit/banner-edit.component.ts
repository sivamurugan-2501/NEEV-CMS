import { Component, OnInit } from '@angular/core';

import { BannerServiceService } from './../services/banner-service.service';
import { Title } from '@angular/platform-browser';
import { elementStyleProp } from '@angular/core/src/render3/instructions';
import { timeout } from 'q';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';

import { ProductService } from '../services/product.service';
import { VideoService } from '../services/video.service';
import { EventService } from '../services/event.service';

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
    linkedTo : 1,
    status: null,
    file_to_delete: null,
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

  instanceId :number;
  error = 0;

  previewImage = null;
  imageRemoved=0;
  file_id;
  file_to_delete:Array<Object> = new Array();

  regions;
  languages;

  productList:any;
  eventList:any;
  videoList:any;

  constructor(private newsBoardService: EventService ,private videoService: VideoService, private productService: ProductService , private storageService: StorageService, private bannerService : BannerServiceService, private titleService: Title, private route: Router, private aRoute: ActivatedRoute) { }

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
            this.loadItems();
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
        
        //console.log(banner);
      }
      const file_del_id: any = (this.file_to_delete[0]) ? this.file_to_delete[0] :null ;
      banner.append("file_to_delete", file_del_id);
      //console.log(banner);

      //return false;
      const __this = this;
      this.bannerService.editBanner(banner, this.instanceId).subscribe(
        response => {
          this.actionStatus=1;
          this.successMessage = "Banner updated successfully";
          const redirect = function(){ __this.route.navigate(["main", "banner-list"]); };
          setTimeout(function(){
            redirect();
          }, 1000);
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

  loadItems(){

    const hasLinkof = this.bannerData.hasLink;

    if(hasLinkof>0){

       if(hasLinkof==1){

          if(!this.productList){
              this.productService.getProducts("id,title").subscribe(
                (response:any) => {
                    if( response.status==200 && response.products ){
                      this.productList = response.products;
                    }
                }
              );
          }
          
        }else if(hasLinkof==2){

          if(!this.videoList){
              const payload = { requestor:1, source:1, maximum:null, status:1, fields: "id,title"};
              
              this.videoService.getVideoList(payload).subscribe(
                (response:any) => {
                    if( response.status==200 && response.videos ){
                      this.videoList = response.videos;
                    }
                }
              );
          }
          
      }else if(hasLinkof==3){

        if(!this.eventList){
            
            
            this.newsBoardService.getEvents().subscribe(
              (response:any) => {
                  if( response.status==200 && response.newsBoard ){
                    this.eventList = response.newsBoard;
                  }
              }
            );
        }
        
    }
    }

  }


}
