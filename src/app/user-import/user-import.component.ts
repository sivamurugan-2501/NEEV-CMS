import { Component, OnInit } from '@angular/core';
import { TgmService } from '../services/tgm.service';

@Component({
  selector: 'app-user-import',
  templateUrl: './user-import.component.html',
  styleUrls: ['./user-import.component.css']
})
export class UserImportComponent implements OnInit {

  userImport = {
    data: new Array(),
    headers : null
  }
  file;
  response;
  uploaded;
  actionStatus=0;
  successMessage=null;
  errorMessage=null;


  constructor(private userService: TgmService) { }

  ngOnInit() {
  }



  readFile(event){

    var data_to_upload:Array<Object>;
    const file:File = event.target.files[0]; 
   // file.name

    const extension = file.name.split(".")[1];
    const typeText = file.type.split("/")[1];
    //alert("type =" + typeText);

    if(extension == "csv" && typeText == "vnd.ms-excel" ){
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () =>{
            const content:any = fileReader.result;
            if(content){
                let split_into_rows = content.split("\n");
                this.userImport.headers = split_into_rows[0];

                for(let i=1;i<split_into_rows.length;i++){
                  this.userImport.data.push(split_into_rows[i].split(","));
                }
                //alert(JSON.stringify(this.userImport));
               //this.
            }
        });

        fileReader.readAsText(file, "UTF-8");
    }else{
       this.file =null;
        return false;
    }
  }



  importUser(){

      this.userService.importUser(this.userImport).subscribe(
        (response:any) => {
            this.response = response.data;
            this.actionStatus=1;
            this.uploaded=1;
            this.successMessage= "User(s) imported succesfully";
        },
        (error)=>{
          this.actionStatus=2;
          this.errorMessage= "Sorry, User import failed";
        }
      );
  }

  showForm(){
    this.uploaded=0;
    this.response = null;
    this.file = null;
    this.userImport.data= new Array();
  }

}
