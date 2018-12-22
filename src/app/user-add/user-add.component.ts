import { Component, OnInit } from '@angular/core';
import { UserAddRequest } from '../model/user-add-request';
import { Config } from 'protractor';
import { ConfigsDataService } from '../services/configs-data.service';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  myDateValue: Date;
 
  userData:UserAddRequest = {
    "first_name": null,
    "last_name":null,
    "mobile": null,
    "email": null,
    "role": null,
    "address": null,
    "state": null,
    "region": null,
    "source": null,
    "pincode": null,
    "birth_date" :null,
    "profile_pic" : null,
    "mapping": 0
  }

  imageError= null;

  langauges :any;
  region:any;
  state:any;
  roles:any;

  
  constructor(private configService:ConfigsDataService, private storageService: StorageService) { }

  ngOnInit() {

    this.myDateValue = new Date();
    this.langauges = this.storageService.getCustomData("LANGUAGES");
    const roles:any = this.storageService.getCustomData("ROLES");
    console.log(roles);
    try{
      this.roles = JSON.parse(roles);
    }catch(e){}
    console.log(this.roles);

    this.region = this.storageService.getCustomData("REGIONS");
    this.state = this.storageService.getCustomData("STATES");

  }

  addUser(){
     let userFormData = new FormData();

     const keys = Object.keys(this.userData);

     keys.forEach(function(k){
        if(k == "profile_pic"){

          let file = this.bannerData[k];
          userFormData.append(k, file, file["name"]);

        }else{

          userFormData.append(k, this.userData[k]);
        }
     });

  }

  onFileChange(event){
    
    this.userData.profile_pic = null;
    this.imageError = null;
    const file: File  = event.target.files[0];
    const type = file.type;
    try{
      const extension = type.split("/")[1];
      if(["png", "jpeg", "jpg"].indexOf(extension.toLocaleLowerCase()) > -1){
        this.userData.profile_pic = file;
      }else{
        this.imageError = "Invalid image file, only .png, .jpg and  .jpeg are accepted.";
        return false;
      }
    }catch(e){
      console.log(e);
    }
  }

}
