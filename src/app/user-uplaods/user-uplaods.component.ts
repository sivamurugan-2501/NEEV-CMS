import { Component, OnInit } from '@angular/core';
import { UserUploadService } from '../services/user-upload.service';
import { TgmService } from '../services/tgm.service';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { StorageService } from '../services/storage.service';
import { NgbdModalComponent2 } from '../multipurpose-popup/multipurpose-popup.component';
declare function select2Fn():any;

declare function setDataTable():any;

@Component({
  selector: 'app-user-uplaods',
  templateUrl: './user-uplaods.component.html',
  styleUrls: ['./user-uplaods.component.css']
})
export class UserUplaodsComponent implements OnInit {

  actionStatus=0;
  userUploadData;
  successMessage;
  errorMessage;

  imagesUpload:any;
  videoUploads:any;
  docUploads:any;
  baseURL;

  image_list;

  noImageUploads = "No image upload(s) available";
  noVideoUploads = "No video upload(s) available";
  noDocUploads = "No document upload(s) available";

  tgmList : Array<Object> = null;
  multipPopup : NgbdModalComponent2;

  constructor(private userUploadService: UserUploadService, private tgmService: TgmService, config: NgbModalConfig, private modalService: NgbModal) { 
    this.multipPopup = new NgbdModalComponent2(modalService);
  }

  ngOnInit() {
    this.loadTGMs();
    this.loadData();
   

    setTimeout( ()=>{
      select2Fn();
      setDataTable();
    },2000);
  }

  loadData(){
    this.userUploadService.getUploads(0,1).subscribe(
      (response:any) => {
          this.imagesUpload =response.data;
          this.baseURL = response.baseURL;
          console.log(this.imagesUpload);
      }
    );

    this.userUploadService.getUploads(0,2).subscribe(
      (response:any) => {
          this.videoUploads =response.data;
          this.baseURL = response.baseURL;
          console.log(this.videoUploads);
      }
    );


    this.userUploadService.getUploads(0,3).subscribe(
      (response:any) => {
          this.docUploads =response.data;
          this.baseURL = response.baseURL;
          console.log(this.docUploads);
      }
    );

  }

  popImage(image, index){

  }

  deleteUpload(id, index){

  }

  loadTGMs(){
    this.tgmService.getUsers_1("TGM", "id, first_name, last_name").subscribe(
      (response:any) => {
          if(response.status==200){
            this.tgmList = response.data;
          }
      },
      (error:any) =>{

      }
    );
  }

  getTgmName(tgmId){
    if(this.tgmList){
      
       var data:any= null;
       for(let i=0;i<this.tgmList.length;i++){
          data = this.tgmList[i];
          if(data.id == tgmId){
              break;
          }
       }
       const first_name = (data.first_name && data.first_name!=null) ? data.first_name : "";
       const last_name = (data.last_name && data.last_name!=null) ? data.last_name : "";
       return first_name+" "+last_name;
    }
  }

  showPopUp(type, source){
    this.multipPopup.open(type, source);
  }

}
