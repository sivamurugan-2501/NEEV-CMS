import { Component, OnInit } from '@angular/core';
import { UserUploadService } from '../services/user-upload.service';

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

  constructor(private userUploadService: UserUploadService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.userUploadService.getUploads(0,1).subscribe(
      (response:any) => {
          this.imagesUpload =response.data;
          console.log(this.imagesUpload);
      }
    );
  }

}
