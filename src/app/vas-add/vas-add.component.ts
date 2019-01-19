import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { VasService } from '../services/vas.service';
import { load } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-vas-add',
  templateUrl: './vas-add.component.html',
  styleUrls: ['./vas-add.component.css']
})
export class VasAddComponent implements OnInit {

  vasData = {
    thumbnail: null,
    name: null,
    description: null,
    language: 0,
    notify:0
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
  descError = "";

  constructor(private storageService: StorageService, private vasService: VasService) { }

  ngOnInit() {
    const languages = this.storageService.getCustomData("LANGUAGES");
    try{
      this.languages = JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }
  }


  onFileChange(event){
    
    this.vasData.thumbnail = null;
    this.imageError = null;
    const file: File  = event.target.files[0];
    const type = file.type;
    
    try{
      const extension = type.split("/")[1];
      if(["png", "jpeg", "jpg"].indexOf(extension.toLocaleLowerCase()) > -1){
    
        const img = new Image();
        this.getImageDimension(file, img);
        const __this = this;
        this.vasData.thumbnail = file;
        setTimeout(()=>{
          //alert(this.imgWidth+ "x" +this.imgHeight);
          if(this.imgWidth == this.allowedImageWidth && this.imgHeight== this.allowedImageHeight){
            
          }else{
            this.vasData.thumbnail = null;
            this.imageError = "Invalid image. Image dimension must be of 720x400";
          }
        }, 1000);

       // alert(this.imgWidth+ "x" +this.imgHeight);

        

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


  saveVas(){

    var vas = new FormData();
    let keys = Object.keys(this.vasData);
    console.log(this.vasData);
   // alert(this.vasData["description"]);
   // alert(this.validateDesc(this.vasData["description"]));
    if(!this.validateDesc(this.vasData["description"])){
       this.descError = "Invalid characters used in description";
       return false;
    }

    for(let i=0; i<keys.length;i++){
      if(keys[i] == "thumbnail"){

        const file= this.vasData[keys[i]];

        if(file && file['name']){
          vas.append(keys[i], file, file["name"] );
        }else{
          vas.append(keys[i], null );
        }

      }else{
        vas.append(keys[i], this.vasData[keys[i]] );
      }
    }
    vas.append("file_to_delete", null);
    this.vasService.add(vas).subscribe(
      (response:any) => {
        if(response.status == 200){
          this.actionStatus =1;
          this.successMessage = "New Value Added Services added successfully";
        }
      },
      
      (error:any) =>{
        this.actionStatus=2;
        this.errorMessage = "Something went wrong";
      }
      
    );

}


validateDesc1(value){
  var pattern = /^[\w  !@#\$%\^\&*\)\(+=._-\s]+$/g
  var regex = new RegExp(pattern);
  return regex.test(value);
}

validateDesc(value){
  var valid = true;
  var notAllowed = ["{", "}", "<", ">"];
  for(let i=0; i<value.length; i++){
    if(notAllowed.indexOf(value[i]) > -1 ){
      valid=false;
      break;
    }
  }

  return valid;
}


}
