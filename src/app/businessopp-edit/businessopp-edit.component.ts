import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessOppService } from '../services/business-opp.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-businessopp-edit',
  templateUrl: './businessopp-edit.component.html',
  styleUrls: ['./businessopp-edit.component.css']
})
export class BusinessoppEditComponent implements OnInit {

  instanceId;

  bussOppData = {
    thumbnail: null,
    name: null,
    //description: null,
    language: 0
  };

  thumbnailImage=null;
  thumbnailId=null;
  languages;

  actionStatus=-1;
  successMessage=null;
  errorMessage=null;
  imageRemoved=0;

  file_to_delete = new Array();
  imageError;


  constructor(private route: Router, private aRoute: ActivatedRoute, private businessService: BusinessOppService,private storageService: StorageService, ){


   }


  ngOnInit() {
    this.aRoute.queryParams.subscribe((q)=>{
        if(q && q.id){
          this.instanceId = q.id;
          this.load(this.instanceId);
        }
    });

    const languages = this.storageService.getCustomData("LANGUAGES");
    try{
      this.languages = JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }
    
  }

  load(id){
    this.businessService.getById(id).subscribe(
      (response:any) => {
         
        if(response.status == 200){
              const data =  response.data;

              try{
                this.bussOppData.name = data.name;
                this.bussOppData.thumbnail = data.thumbnail;
                this.bussOppData.language = data.language;
                this.thumbnailImage = data.thumbnailImage;
              }catch(e){}
        }

      }
    );
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
          businessOpp.append(keys[i], this.bussOppData[keys[i]] );
        }

      }else{
        businessOpp.append(keys[i], this.bussOppData[keys[i]] );
      }
    }

    businessOpp.append("file_to_delete", this.file_to_delete[0]);
    this.businessService.edit(businessOpp, this.instanceId).subscribe(
      (response:any) => {
        if(response.status == 200){
          this.actionStatus =1;
          this.successMessage = "Business opportunities uodated successfully";
          this.route.navigate(["main", "business-oppportunit-list"]);
        }
      },
      
      (error:any) =>{
        this.actionStatus=2;
        this.errorMessage = "Something went wrong";
      }
      
    );
  }


  removeFile(){
      this.imageRemoved =1;
      this.thumbnailId = this.bussOppData.thumbnail;
      this.bussOppData.thumbnail = null;
      this.file_to_delete.push(this.thumbnailId);
  }

  undoRemoved(){
    this.imageRemoved=0;
    this.file_to_delete.pop();
    this.bussOppData.thumbnail = this.thumbnailId;
  }


  onFileChange(event){
    
    this.bussOppData.thumbnail = null;
    this.imageError = null;
    const file: File  = event.target.files[0];
    const type = file.type;
    try{
      const extension = type.split("/")[1];
      if(["png", "jpeg", "jpg"].indexOf(extension.toLocaleLowerCase()) > -1){
        this.bussOppData.thumbnail = file;
      }else{
        this.imageError = "Invalid image file, only .png, .jpg and  .jpeg are accepted.";
        return false;
      }
    }catch(e){
      console.log(e);
    }
  }

}
