import { Component, OnInit } from '@angular/core';
import { TgmService } from '../services/tgm.service';
import { NotificationService } from '../services/notification.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {

  notification:any = {
    title: null,
    message: null,
    recipient_group: 2,
    recipients : [],
    region: 1
  };
  regions : any;

  tgmList:any = new Array();

  actionStatus:any;
  successMessage = "Notification sent to TGMs";
  errorMessage = "Error coocured";

  constructor(private route: Router, private tgmService: TgmService, private notificationService: NotificationService, private storageService: StorageService) { }

  ngOnInit() {
    const regions = this.storageService.getCustomData("REGIONS");
    try{
      this.regions = JSON.parse(regions);
    }catch(e){
      this.regions= regions;
    }  

    this.loadTGM();
  
  }

  loadTGM(){
    this.tgmService.getUsers("TGM").subscribe(

      (response:any) => {
          if(response.status ==200){
              this.tgmList = response.data;
          }
      }

    );
  }

  sendNotification(){

    this.notificationService.sendNotification(this.notification).subscribe(
        (response:Response) =>{
            if(response.status ==200){
                this.actionStatus=1;
                const __this= this;
                setTimeout(function(){
                  __this.route.navigate(["main","notification-list"]);
                }, 3000);

            }else{
              this.actionStatus=2;
            }
        },

        (error) =>{
          this.actionStatus=2;
        }
    );

  }

}
