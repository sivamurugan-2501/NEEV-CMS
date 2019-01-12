import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { VasService } from '../services/vas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vas-edit',
  templateUrl: './vas-edit.component.html',
  styleUrls: ['./vas-edit.component.css']
})
export class VasEditComponent implements OnInit {

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

  thumbnailId=0;
  file_to_delete:Array<any> = new Array();
  imageRemoved=0;
  instanceId=0;
  thumbnailImage:null;

  constructor(private storageService: StorageService, private vasService: VasService, private aRoute: ActivatedRoute) { }

  ngOnInit() {

    const languages = this.storageService.getCustomData("LANGUAGES");
    try{
      this.languages = JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }

    this.aRoute.queryParams.subscribe(
      (q) => {
         if(q && q.id){

            this.instanceId= q.id;
            this.load(q.id);
         }
      }
    );

  }


  load(id){

    this.vasService.getById(id).subscribe(
      (response:any) => {
          if(response.status == 200){
             const data = response.data;
             this.vasData.name = data.name;
             this.vasData.language = data.language;
             this.vasData.notify = data.notify;
             this.vasData.description = data.description;
             this.vasData.thumbnail = this.thumbnailId = data.thumbnail;
             this.thumbnailImage = data.thumbnailImage;
            // alert(this.thumbnailImage);
          }
      }
    );
  }

  onFileChange(event){
    
    this.vasData.thumbnail = null;
    this.imageError = null;
    const file: File  = event.target.files[0];
    const type = file.type;
    try{
      const extension = type.split("/")[1];
      if(["png", "jpeg", "jpg"].indexOf(extension.toLocaleLowerCase()) > -1){
        this.vasData.thumbnail = file;
      }else{
        this.imageError = "Invalid image file, only .png, .jpg and  .jpeg are accepted.";
        return false;
      }
    }catch(e){
      console.log(e);
    }
  }


  saveVas(){
      var vas = new FormData();
      let keys = Object.keys(this.vasData);

      for(let i=0; i<keys.length;i++){
        if(keys[i] == "thumbnail"){

          const file= this.vasData[keys[i]];

          if(file && file['name']){
            vas.append(keys[i], file, file["name"] );
          }else{
            vas.append(keys[i], this.vasData[keys[i]] );
          }

        }else{
          vas.append(keys[i], this.vasData[keys[i]] );
        }
      }
      vas.append("file_to_delete", this.file_to_delete[0]);
      this.vasService.edit(vas, this.instanceId).subscribe(
        (response:any) => {
          if(response.status == 200){
            this.actionStatus =1;
            this.successMessage = "New Value Added Services added successfully";
          }
        },
        
        (error:any) =>{
          this.actionStatus=2;
          this.errorMessage = "Somethignwent wrong";
        }
        
      );
  }



  removeFile(){
    this.imageRemoved =1;
    this.thumbnailId = this.vasData.thumbnail;
    this.vasData.thumbnail = null;
    this.file_to_delete.push(this.thumbnailId);
  }

  undoRemoved(){
    this.imageRemoved=0;
    this.file_to_delete.pop();
    this.vasData.thumbnail = this.thumbnailId;
  }

}
