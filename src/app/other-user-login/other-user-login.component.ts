import { Component, OnInit } from '@angular/core';
import { OtheruserService } from '../services/otheruser.service';
import { TgmService } from '../services/tgm.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-other-user-login',
  templateUrl: './other-user-login.component.html',
  styleUrls: ['./other-user-login.component.css']
})
export class OtherUserLoginComponent implements OnInit {

  oLoginData = {
    username : null,
    imei : 0,
    timestamp : null
  }

  otpData = {
    user_otp :null,
    imei : 0,
    otp_id : null

  }

  invalidMobile =false;
  invalidOTP = false;

  actionStatus=null;
  actionMessage = null;

  usernameAuthenticated = false;

  generated_otp_token = null;

  // 1 In Progress, 0 Nothing in progress 
  request_status = 0;


  constructor(private otherUserService: TgmService, private strService : StorageService) { }

  ngOnInit() {
  }

  authenticate(){

    this.invalidMobile =false;

    if(this.validateMobile()==false){

      this.invalidMobile = true;
      return false;
    }
    this.request_status =1;
    this.otherUserService.authenticate(this.oLoginData).subscribe(
      (response:any) => {
          console.log(response);
          if(response.status ==200){
            this.actionStatus =1;
            this.actionMessage = response.message;
            if(response.otp_token){
              this.generated_otp_token = response.otp_token;
              this.usernameAuthenticated = true;
            }
          }else if(response.status==400){
            this.actionStatus =2;
            this.actionMessage = response.message;
          }else{
            this.actionStatus =2;
            this.actionMessage = "Something went wrong";
          }
          this.request_status=0;
      },
      (error:any) => {
        console.log(error.error);
        if(error.error.status == 4004){
          this.actionStatus =2;
          this.actionMessage = error.error.message;
        }
        this.request_status=0;
      }
      
    );
    //this.request_status=0;
  }


  validateMobile(){
     if(this.oLoginData.username && this.oLoginData.username.length==10){

       const mobile = this.oLoginData.username;
       //const pattern = /[0-9]$/;
      // const regex = new RegExp(pattern);

       return !isNaN(mobile);
     }

     return false;
  }

  authorizeOTP(){
    this.invalidOTP =false;

    if(this.validateOTP()==false){

      this.invalidOTP = true;
      return false;
    }

    this.otpData.otp_id = this.generated_otp_token;
    this.request_status=1;

    this.otherUserService.checkOTP(this.otpData).subscribe(
      (response:any) => {
          console.log(response);
          if(response.status ==200){

            this.strService.storeUserData(JSON.stringify(response.userData));
            this.strService.setToken(response.appToken);
            this.actionStatus =1;
            this.actionMessage = response.message;
            window.location.href = "/main/dashboard";

          }else if(response.status==400){
            this.actionStatus =2;
            this.actionMessage = response.message;
          }else{
            this.actionStatus =2;
            this.actionMessage = "Something went wrong";
          }
          this.request_status=0;
      },
      (error:any) => {
        console.log(error.error);
        if(error.error.status == 4004){
          this.actionStatus =2;
          this.actionMessage = error.error.message;
        }
        this.request_status=0;
      }
    );
    //this.request_status=0;
  }


  validateOTP(){
    if(this.otpData.user_otp && this.otpData.user_otp.length==4){

      const otp_code = this.otpData.user_otp;
      //const pattern = /[0-9]$/;
     // const regex = new RegExp(pattern);

      return !isNaN(otp_code);
    }

    return false;
 }

}
