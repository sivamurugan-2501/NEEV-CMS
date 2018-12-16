import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BannerlistRequest } from '../model/bannerlist-request';
import { BannerlistResponse, BannerData } from '../model/bannerlist-response';
import { VideoService } from '../services/video.service';

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

  videoData;
  
  constructor(private authService:AuthService, private videoService: VideoService) {
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

}
