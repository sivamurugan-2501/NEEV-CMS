import { Component, OnInit } from '@angular/core';
import { TgmService } from '../services/tgm.service';
import { Router } from '@angular/router';
import { NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantsData } from '../constants-data';

declare function setDataTable() :any;

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

  popUpObject: NgbdModalComponent;

  constructor(private userService: TgmService, private route: Router, modalService : NgbModal) { 
      this.popUpObject = new NgbdModalComponent(modalService);
  }

  ngOnInit() {
     this.load();
     setTimeout(()=>{
      setDataTable();
    }, 200);
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

      this.popUpObject.open(ConstantsData.ARE_YOU_SURE, "This user won't be able to access the system", {
        "callback" : this.delete,
        "params" : [id, index, this]
      })
  }

  delete(id, index, __this){

  /*   const confirmation = window.confirm("Are you sure, you want to delete ?");

    if(!confirmation){
      return false;
    }
 */
    __this.userService.deleteUser(id).subscribe(
      (response:any) => {
        if(response.status == 200){
            __this.actionStatus = 1;
            //alert(index);
            //alert(this.allUserData[index]);
            __this.allUserData[index]["status"] =0;
            __this.allUserData.splice(index,1);
        }else{
          __this.actionStatus = 2;
        }
      },

      (error) => {
          __this.actionStatus = 2;
      }
    );
  }


  showOnlyTSM(){
    this.allUserData = this.tsmUsers;
  }


  
  showOnlyTGM(){
    this.allUserData = this.tgmUsers;
  }

  
  showAll(){
    this.allUserData = this.tgmUsers.concat(this.tsmUsers);
  }

  importUsers(){
      this.route.navigate(["main","user-import"]);
  } 


}
