import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { ConstantsData } from '../constants-data';
import { TgmService } from '../services/tgm.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {


  userData:any;
  user_first_name;
  user_last_name;
  user_email;

  popUpObject : NgbdModalComponent;
  userRole : null;
  roleChecked = 0;
  roleType = 0;

  constructor(private storageService: StorageService, private authService: AuthService, private route:Router, private modalService: NgbModal, private userSerive: TgmService) {
    this.popUpObject = new NgbdModalComponent(modalService);
    
   }




  ngOnInit() {

    const userData:any = this.storageService.getUserData();
    try{
      this.userData = JSON.parse(userData);
      this.user_first_name = this.userData.first_name;
      this.user_last_name = this.userData.last_name;
      this.user_email = this.userData.email;
      //alert( this.userData);
    }catch(e){
      this.userData= userData;
    }

   // alert( this.userData);
   // const userData:any = this.storageService.getUserData();
   const forRole = this.userData.role; 
   const userid = this.userData.id; 

    if(forRole){
       this.userSerive.checkRole(forRole, userid).subscribe(
         (response:any) => {
          
            if(response.status == 200){
               const roleGot = response.data.role;
               if(roleGot == forRole){
                 this.roleChecked=1;
                 this.roleType = (roleGot== "SUDO") ? 1 : (( roleGot == "TSM" ) ? 2 :0 );
               
               }

            }
         }
       );
    }

  }

  logout(){


    const response = this.popUpObject.open(ConstantsData.ARE_YOU_SURE, ConstantsData.LOGOUT_CONFIRMATION, {
      "callback" : this.logout_do,
      "params" : [this]});
      
  }


  logout_do(_this){
    _this.authService.logout();
    _this.route.navigate(["login"]);
  }

}
