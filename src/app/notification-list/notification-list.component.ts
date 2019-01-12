import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ConstantsData } from '../constants-data';

declare function setDataTable():any;

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notifications:any;
  actionStatus=-1;
  successMessage= ConstantsData.EVENT_DELETE_SUCCESS;
  errorMessage = ConstantsData.ERROR_MESSAGE;
  loaded=0;
  
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();

    setTimeout(()=>{
      setDataTable();
    }, 200);
  }

  loadData(){
    this.notificationService.getActiveNotifications().subscribe(
      (response:any) => {
        if(response.status == 200){
            this.notifications = response.data;
            this.loaded=1;
        }
      }
    );
  }

  deleteNotification(id, index){
      this.notificationService.deleteNotification(id).subscribe(
        (response:any) => {
           if(response.status == 200){
              this.actionStatus =1;
              this.notifications.splice(index, 1);
           }else{
             this.actionStatus =2;
           }
        },
        (error) => {
            this.actionStatus =2;
        }
      );
  }

}
