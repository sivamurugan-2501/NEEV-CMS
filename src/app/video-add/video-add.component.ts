import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import {Response} from './../model/response';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {

  categoryOptions = [
    {name :"Select", value: 0},
    {name :"Product", value: 1},
   // {name :"Event", value: 2},
    {name :"TV Commercials", value: 2},
    {name :"Others", value: 3}
  ]

  typeOptions = [
    {name :"File", value: 1},
    {name :"URL", value: 2}
 ]

 
  
  videoData = {
   title : null,
   type : 1,
   videoFile: null,
   downloadable : 0,
   category :0,
   language: 1,
   url: null,
   product: 0,
   event: 0,
   thumbnailImage: null
 }

 imageError;

actionStatus = 0;
successMessage:String = "Success";
errorMessage = "Something went wrong.";
languages:any;

  constructor(private storageService:StorageService, private videoService : VideoService, private route:Router) { }

  ngOnInit() {
      
    const languages = this.storageService.getCustomData("LANGUAGES");

    try{
      this.languages = JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }
  }

  saveVideo(){
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
        }else if(keys[i] == "thumbnailImage"){
          let file = this.videoData[keys[i]];
          video.append(keys[i], file, file["name"]);
        }else{
          video.append(keys[i], this.videoData[keys[i]]);
        }
        
      }
      this.videoService.postVideo(video).subscribe(
        //on success
        (response:Response)  => {
          alert(response);
          this.actionStatus = 1;
          this.successMessage = response.message;
          const __this= this;
          setTimeout(function(){
            __this.route.navigate(["main","video-list"]);
          },3000);
        },
        // on error
        errorResponse => {
          this.actionStatus = 2;
          console.log(errorResponse.error);
        }
      );
      return false;

  }

  onFileChange(event){
    const file = this.videoData.videoFile = event.target.files[0]; 
    //alert(event.target.files);
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
      }else{
        this.imageError = "Invalid image file, only .png, .jpg and  .jpeg are accepted.";
        return false;
      }
    }catch(e){
      console.log(e);
    }
  }

}
