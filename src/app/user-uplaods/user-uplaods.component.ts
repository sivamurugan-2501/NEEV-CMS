import { Component, OnInit } from '@angular/core';
import { UserUploadService } from '../services/user-upload.service';
import { Lightbox, IAlbum } from 'ngx-lightbox';


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

  constructor(private userUploadService: UserUploadService) { }

  ngOnInit() {
    this.loadData();
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

}
