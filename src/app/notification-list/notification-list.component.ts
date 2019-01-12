import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ConstantsData } from '../constants-data';
import { NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  popUpObject : NgbdModalComponent;
  
  constructor(private notificationService: NotificationService, modalService: NgbModal) { 
    this.popUpObject = new NgbdModalComponent(modalService);
  }

  ngOnInit() {
    this.loadData();

    setTimeout(()=>{
      setDataTable();
    }, 2000);
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
    this.popUpObject.open(ConstantsData.ARE_YOU_SURE, "You won't be able to access this notification", {
      callback : this.delete,
      params : [id, index, this]
    });
  }

  delete(id, index, __this){
    __this.notificationService.deleteNotification(id).subscribe(
        (response:any) => {
           if(response.status == 200){
            __this.actionStatus =1;
            __this.notifications.splice(index, 1);
           }else{
            __this.actionStatus =2;
           }
        },
        (error) => {
          __this.actionStatus =2;
        }
      );
  }

}
