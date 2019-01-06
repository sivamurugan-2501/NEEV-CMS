import { Component, OnInit } from '@angular/core';
import { UserAddRequest } from '../model/user-add-request';
import { TgmService } from '../services/tgm.service';
import { ConfigsDataService } from 'replace/app/services/configs-data.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tgm-add',
  templateUrl: './tgm-add.component.html',
  styleUrls: ['./tgm-add.component.css']
})
export class TgmAddComponent implements OnInit {

  myDateValue: Date;
 
  userData:UserAddRequest = {
    "first_name": null,
    "last_name":null,
    "mobile": null,
    "email": null,
    "role": 0,
    "address": null,
    "state": null,
    "region": null,
    "source": 1,
    "pincode": null,
    "birth_date" :null,
    "profile_pic" : null,
    "mapping": 0,
    "file_to_delete" :null
  }

  imageError= null;
  errorStatus=0;
  actionStatus=0;
  successMessage = "New user successfully";
  errorMessage = "Something went wrong.";
  
  langauges :any;
  regions:any;
  states:any;
  roles:any;


  constructor(private tgmService:TgmService, private configService:ConfigsDataService, private storageService:StorageService, private route:Router) { }

  ngOnInit() {

    const roles:any = this.storageService.getCustomData("ROLES");
   
    try{
      this.roles = JSON.parse(roles);
    }catch(e){
      this.roles = roles;
    }


    const region = this.storageService.getCustomData("REGIONS");

    try{
      this.regions = JSON.parse(region);
    }catch(e){
      this.regions = region;
    }

    const states = this.storageService.getCustomData("STATES");

    try{
      this.states = JSON.parse(states);
    }catch(e){
      this.states = states;
    }
  

  }

  addUser(){
      this.actionStatus=0;
      let userFormData = new FormData();

      const keys = Object.keys(this.userData);

      const __this = this;
      keys.forEach(function(k){
       
        if(k == "profile_pic"){

          let file = __this.userData[k];
          if(file){
            userFormData.append(k, file, file["name"]);
          }else{
            userFormData.append(k, file, k);
          }

        }else{

          userFormData.append(k, __this.userData[k]);
        }
      });

      this.tgmService.addTGM(userFormData).subscribe(
        (response: Response) =>{
         if(response.status == 200){
           this.actionStatus =1;
           const __this = this;
           setTimeout(function(){
            __this.route.navigate(["main","user-list"]);
           },3000);
         }else{
          this.actionStatus =2;
           this.errorStatus =1;
         }
        },

        (error:any) =>{

          this.errorStatus =1;
          this.actionStatus =2;
          if(error.status = 422){
            this.errorMessage = JSON.stringify(error.error);
          }else{
            this.errorMessage = "Soemthing went wrong.";
          }
          
        }
      );

      return false;

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
