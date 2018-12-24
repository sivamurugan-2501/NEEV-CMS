import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Response } from '../model/response';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

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

 
  
  videoData = {
   title : null,
   type : 1,
   videoFile: null,
   downloadable : 0,
   category :0,
   language: 1,
   url: null
 };

actionStatus = 0;
successMessage:String = "Success";
errorMessage = "Something went wrong.";
instanceId=0;
languages:any;

  constructor(private storageService:StorageService, private videoService: VideoService, private aRoute: ActivatedRoute, private route: Router) { }

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
        }else if(keys[i]!="id"){
          video.append(keys[i], this.videoData[keys[i]]);
        }
        
      }
      this.videoService.updateVideo(this.instanceId ,video).subscribe(
        //on success
        (response:Response)  => {
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
          this.actionStatus = 2;
          console.log(errorResponse.error);
        }
      );
      return false;

  }

}
