import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BannerlistRequest } from '../model/bannerlist-request';
import { VideoService } from '../services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  userData;
  userId;
  serverBaseURL;
  payload : BannerlistRequest = {
    requestor : null,
    maximum : null,
    source :null,
    status : null
  };

  noRecordMessage = "No video(s) found."

  videoData :Array<Object>;
  actionStatus;
  successMessage;
  
  constructor(private authService:AuthService, private videoService: VideoService, private route: Router) {
    this.userData  = authService.loginUserData();

    try{
      this.userData = JSON.parse(this.userData);
      this.userId = this.userData["id"];
    }catch(e){

    }
   }

   loadData(){
    

    this.payload.requestor = this.userId;
    this.payload.source =1;
    this.payload.maximum = null;
    this.payload.status = 1;

    this.videoService.getVideoList(this.payload).subscribe( (response: any) => {
        if(response.status == 200){
          this.serverBaseURL =  response.baseURL;
          this.videoData = response.videos;
        }
    });
  }


  ngOnInit() {
    this.loadData();
  }

  deletVideo(id, index){

    const confirmation = confirm("Are you sure, that you want to delete this video ?");

    if(confirmation){
      this.videoService.deleteVideo(id).subscribe(
        (response:Response) => {

          if(response.status==200){
              this.actionStatus =1;
              this.successMessage = "Video deleted successfully.";
              this.videoData.splice(index,1);
          }

        }
      );
    }
  }

  editVideo(id:number,i){
    if(id>0){
      this.route.navigate(["main", "edit-video"], {queryParams : {"id" : id}});
    }
  }

}
