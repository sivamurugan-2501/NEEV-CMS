import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BusinessOppService } from '../services/business-opp.service';

@Component({
  selector: 'app-business-oppor-add',
  templateUrl: './business-oppor-add.component.html',
  styleUrls: ['./business-oppor-add.component.css']
})
export class BusinessOpporAddComponent implements OnInit {

  bussOppData = {
    thumbnail: null,
    name: null,
    //description: null,
    language: 0
  }

  languages:any;
  imageError;

  actionStatus=-1;
  successMessage=null;
  errorMessage=null;

  imgWidth =0;
  imgHeight =0;
  
  allowedImageHeight = 400;
  allowedImageWidth = 720;
  allowedImageSixe =0;


  constructor(private storageService: StorageService, private businessService:BusinessOppService) { }

  ngOnInit() {
    const languages = this.storageService.getCustomData("LANGUAGES");
    try{
      this.languages = JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }
  }

  saveBusinessOpportunities(){

      var businessOpp = new FormData();
      let keys = Object.keys(this.bussOppData);

      for(let i=0; i<keys.length;i++){
        if(keys[i] == "thumbnail"){

          const file= this.bussOppData[keys[i]];

          if(file && file['name']){
            businessOpp.append(keys[i], file, file["name"] );
          }else{
            businessOpp.append(keys[i], null );
          }

        }else{
          businessOpp.append(keys[i], this.bussOppData[keys[i]] );
        }
      }

      this.businessService.add(businessOpp).subscribe(
        (response:any) => {
          if(response.status == 200){
            this.actionStatus =1;
            this.successMessage = "New business opportunities added successfully";
          }
        },
        
        (error:any) =>{
          this.actionStatus=2;
          this.errorMessage = "Somethignwent wrong";
        }
        
      );

  }


  onFileChange(event){
    
    this.bussOppData.thumbnail = null;
    this.imageError = null;
    const file: File  = event.target.files[0];
    const type = file.type;
    try{
      const extension = type.split("/")[1];
      if(["png", "jpeg", "jpg"].indexOf(extension.toLocaleLowerCase()) > -1){
       
        const img = new Image();
        this.getImageDimension(file, img);
        const __this = this;
        this.bussOppData.thumbnail = file;
        setTimeout(()=>{
          //alert(this.imgWidth+ "x" +this.imgHeight);
          if(this.imgWidth == this.allowedImageWidth && this.imgHeight== this.allowedImageHeight){
            
          }else{
            this.bussOppData.thumbnail = null;
            this.imageError = "Invalid image. Image dimension must be of 720x400";
          }
        }, 1000);
        
      }else{
        this.imageError = "Invalid image file, only .png, .jpg and  .jpeg are accepted.";
        return false;
      }
    }catch(e){
      console.log(e);
    }
  }

  getImageDimension(file:File, img){

    var _URL = window.URL;
    
    var loaded =0 ;
    var imgHeight = 0, imgWidth =0;
  
    const __this = this;

    img.onload = function(element){
      
      __this.imgHeight = imgHeight = img.height;
      __this.imgWidth = imgWidth = img.width;
      loaded=1;
    };

    img.src = _URL.createObjectURL(file);

  }

}



