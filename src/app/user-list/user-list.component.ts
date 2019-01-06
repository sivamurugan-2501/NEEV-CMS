import { Component, OnInit } from '@angular/core';
import { TgmService } from '../services/tgm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  tgmUsers : Array<Object>= new Array();
  tsmUsers : Array<Object>= new Array();

  actionStatus =0;
  successMessage = "User deleted successfully.";
  errorMessage = "Somethig went wrong.";

  allUserData: Array<Object>;
  noRecordMessage = "No user available.";
  loaded=0;

  constructor(private userService: TgmService, private route: Router) { }

  ngOnInit() {
     this.load();
  }

  load(){

    this.userService.getUsers("TGM").subscribe(
      (response:any) => {
        
        if(response.status==200){
            this.tgmUsers = response.data;
        }

      },
      (error) => {

      }
    );

    this.userService.getUsers("TSM").subscribe(
      (response:any) => {
        
        if(response.status==200){
            this.tsmUsers = response.data;
            this.allUserData = this.tgmUsers.concat(this.tsmUsers);
            this.loaded=1;
            console.log(this.allUserData);
        }

      },
      (error) => {

      }
    );
  }



  editUser(id){
    this.route.navigate(["main","edit-user"], {
      queryParams : {
        "id" : id
      }
    });
  }

  deleteUser(id, index){

    const confirmation = window.confirm("Are you sure, you want to delete ?");

    if(!confirmation){
      return false;
    }

    this.userService.deleteUser(id).subscribe(
      (response:any) => {
        if(response.status == 200){
            this.actionStatus = 1;
            //alert(index);
            //alert(this.allUserData[index]);
            this.allUserData[index]["status"] =0;
        }else{
          this.actionStatus = 2;
        }
      },

      (error) => {
          this.actionStatus = 2;
      }
    );
  }

}
