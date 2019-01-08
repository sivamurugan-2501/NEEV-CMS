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


  constructor(private userService: TgmService) { }

  ngOnInit() {
  }



  readFile(event){

    var data_to_upload:Array<Object>;
    const file:File = event.target.files[0]; 
   // file.name

    const extension = file.name.split(".")[1];
    const typeText = file.type.split("/")[1];
    alert("type =" + typeText);

    if(extension == "csv" && typeText == "vnd.ms-excel" ){
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () =>{
            const content = fileReader.result;
            if(content){
                let split_into_rows = content.split("\n");
                this.userImport.headers = split_into_rows[0];

                for(let i=1;i<split_into_rows.length;i++){
                  this.userImport.data.push(split_into_rows[i].split(","));
                }
                alert(JSON.stringify(this.userImport));
                this.importUser();
            }
        });

        fileReader.readAsText(file, "UTF-8");
    }
  }



  importUser(){
      this.userService.importUser(this.userImport).subscribe(
        (response) => {

        }
      );
  }

}
