import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import {Response} from './../model/response';

@Component({
  selector: 'app-video-add',
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class VideoAddComponent implements OnInit {

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
 }

actionStatus = 0;
successMessage:String = "Success";
errorMessage = "Something went wrong.";

  constructor(private videoService : VideoService) { }

  ngOnInit() {
    
  }

  saveVideo(){
    alert("submit");
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
    alert(event.target.files);
  }

}
