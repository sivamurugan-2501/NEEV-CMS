import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
//import { BannerlistRequest } from '../model/bannerlist-request';
import { VideoService } from '../services/video.service';
import { Router } from '@angular/router';
//import { StorageService } from '../services/storage.service';

import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { NgbdModalComponent2 } from '../multipurpose-popup/multipurpose-popup.component';
import { ConstantsData } from '../constants-data';

declare function setDataTable():any;

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  userData;
  userId;
  serverBaseURL="";
  payload : any = {
    requestor : null,
    maximum : null,
    source :null,
    status : null,
    fields : null
  };

  noRecordMessage = "No video(s) found."

  videoData :Array<Object>;
  actionStatus;
  successMessage;

  popUpObject : NgbdModalComponent;
  multipPopup : NgbdModalComponent2;
  
  constructor(private authService:AuthService, private videoService: VideoService, private route: Router,  private modalService: NgbModal) {
    
    this.popUpObject = new NgbdModalComponent(modalService);
    this.multipPopup = new NgbdModalComponent2(modalService);
    
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
    this.payload.fields = null;

    this.videoService.getVideoList(this.payload).subscribe( (response: any) => {
        if(response.status == 200){
          //this.serverBaseURL =  response.baseURL;
          this.videoData = response.videos;
        }
    });
  }


  ngOnInit() {
    this.loadData();
    setTimeout( ()=>{
      setDataTable();
    },2000)
  }

  deletVideo(id, index){

    this.popUpObject.open(ConstantsData.ARE_YOU_SURE, ConstantsData.DELETE_VIDEO_CONFIRMATION,{
      "callback" : this.delete,
      "params" : [id, index, this]});

  }
  
  delete(id, index, __this){

    //const confirmation = confirm("Are you sure, that you want to delete this video ?");

    //if(confirmation){
      __this.videoService.deleteVideo(id).subscribe(
        (response:Response) => {

          if(response.status==200){
            __this.actionStatus =1;
            __this.successMessage = "Video deleted successfully.";
            __this.videoData.splice(index,1);
          }

        }
      );
    //}
  }

  editVideo(id:number,i){
    if(id>0){
      this.route.navigate(["main", "edit-video"], {queryParams : {"id" : id}});
    }
  }

  videoPreview(videoLink){
    //alert(videoLink);
    this.multipPopup.open(2, videoLink);
  }

}
