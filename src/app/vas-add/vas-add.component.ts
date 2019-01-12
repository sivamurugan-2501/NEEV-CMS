import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { VasService } from '../services/vas.service';

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
        this.errorMessage = "Somethignwent wrong";
      }
      
    );

}

}
