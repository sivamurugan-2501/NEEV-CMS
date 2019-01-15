import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Response } from '../model/response';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';


import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent2 } from '../multipurpose-popup/multipurpose-popup.component';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  categoryOptions = [
    {name :"Select", value: 0},
    {name :"Product", value: 1},
    {name :"Event", value: 2},
    {name :"TV Commercials", value: 3},
    {name :"Others", value: 4}
  ]

  typeOptions = [
    {name :"File", value: 1},
    {name :"URL", value: 2}
 ]

 
  
  videoData:any = {
   title : null,
   type : 1,
   videoFile: null,
   downloadable : 0,
   category :0,
   language: 1,
   url: null,
   product: 0,
   event:0,
   thumbnailImage : null,
   file_to_delete: null,
   notify:0,
 };

actionStatus = 0;
successMessage:String = "Success";
errorMessage = "Something went wrong.";
instanceId=0;
languages:any;
thumbnailId;
previewImage = null;
videoLink= null;
imageRemoved=0;
videoId=0;
videoRemoved=0;
imageError=null;

file_to_delete:Array<Object> = new Array();
popUpObject : NgbdModalComponent2;

thumbnailImage;

  constructor(modalService : NgbModal,private storageService:StorageService, private videoService: VideoService, private aRoute: ActivatedRoute, private route: Router) { 
    this.popUpObject = new NgbdModalComponent2(modalService);
    
  }

  ngOnInit() {
    
    

    const languages = this.storageService.getCustomData("LANGUAGES");

    try{
      this.languages = JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }

    this.aRoute.queryParams.subscribe(
      (params) => {
        this.instanceId = params["id"];
        if(isNaN(this.instanceId)){
          this.actionStatus =2;
        }else{
          this.loadVideo();
          
        }
      }
    );


  }

  loadVideo(){

    const id = this.instanceId;

    this.videoService.getVideoById(id).subscribe(
        (response:any) => {

          if(response.status == 200){
            this.videoData = response.videos;
            this.createThumbnail(response.baseURL);
          }

        }
    );
   
  }

  updateVideo(){
      
    //alert("submit");
      var video = new FormData();  
      let keys = Object.keys(this.videoData);
    
      for(let i=0;i<keys.length;i++){
        //alert(this.videoData[keys[i]]);
        if(keys[i] == "videoFile"){
          if(this.videoData["type"]==1){
            
            let file = this.videoData[keys[i]];
            video.append(keys[i], file, file["name"]);
          
          }else{

            video.append(keys[i], null);

          }
        }
        else if(keys[i]=="thumbnailImage"){

          let file = this.videoData[keys[i]];
          if( isNaN(file) &&  file["name"]){
            video.append(keys[i], file, file["name"]);
          }else{
            video.append(keys[i], file);
          }
         
          
        
        }
        else if(keys[i]!="id" && keys[i]!="thumbnailId" && keys[i]!="videoId"){
          video.append(keys[i], this.videoData[keys[i]]);
        }
        
      }
      const file_del_id: Array<any> = (this.file_to_delete) ? this.file_to_delete :null ;
      video.append("file_to_delete[]", null);
      file_del_id.forEach((element) =>{
        video.append("file_to_delete[]", element);
      });
     

      this.popUpObject.open(3,null);
      this.videoService.updateVideo(this.instanceId ,video).subscribe(
        //on success
        (response:Response)  => {

          this.popUpObject.dismissModal();
          //alert(response);
          this.actionStatus = 1;
          this.successMessage = response.message;

          const __this= this;
          setTimeout(function(){
            __this.route.navigate(["main","video-list"]);
          },3000);
        },
        // on error
        errorResponse => {
          
          this.popUpObject.dismissModal();
          this.actionStatus = 2;
          console.log(errorResponse.error);
          
        }
      );
      return false;

  }



  createThumbnail(baseURL){
    if(this.videoData.thumbnailImage){
      const image = this.videoData.thumbnailImage;
      this.previewImage = image;
      this.thumbnailImage = this.videoData.thumbnailImage;
      this.videoData.thumbnailImage = this.videoData.thumbnailId;
    }
    //alert(image);
  }

  removeThumbnail(){
      this.imageRemoved =1;
      this.thumbnailId = this.videoData.thumbnailId;
      
      this.file_to_delete.push(this.thumbnailId);
      this.videoData.thumbnailId = null;
     
  }

  undoRemovedThumbnail(){
    this.imageRemoved=0;
    this.file_to_delete.pop();
    this.videoData.thumbnailId = this.thumbnailId;
  }

  createVideoLink(baseURL){
    const videoLink =  this.videoData.videoFile;
    this.videoLink = videoLink;
  }

  removeVideo(){
    this.videoRemoved =1;
    this.videoId = this.videoData.videoId;
    this.videoData.videoId = null;
    this.file_to_delete.push(this.videoId);
  } 

  undoRemovedVideo(){
    this.videoRemoved=0;
    this.file_to_delete.pop();
    this.videoData.videoId = this.videoId;
  }


  onImageChange(event){
    
    this.videoData.thumbnailImage = null;
    this.imageError = null;
    const file: File  = event.target.files[0];
    const type = file.type;
    try{
      const extension = type.split("/")[1];
      if(["png", "jpeg", "jpg"].indexOf(extension.toLocaleLowerCase()) > -1){
        this.videoData.thumbnailImage = file;
       // alert(this.videoData.thumbnailImage);
      }else{
        this.imageError = "Invalid image file, only .png, .jpg and  .jpeg are accepted.";
        return false;
      }
    }catch(e){
      console.log(e);
    }
  }

}
