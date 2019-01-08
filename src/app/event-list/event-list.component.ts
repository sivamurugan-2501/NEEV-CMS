import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ConstantsData } from '../constants-data';
import { Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopupsComponent, NgbdModalComponent } from '../custom-popups/custom-popups.component';

declare function setDataTable():any;

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  eventData:any;
  loaded=0;

  successMessage =null;
  actionStatus =-1;
  errorMessage = null;

  noRecordMessage = ConstantsData.noEventsMessage;

  popUpObject : NgbdModalComponent;

  constructor(private eventService: EventService, private route: Router, private modalService: NgbModal) {
    this.popUpObject = new NgbdModalComponent(modalService);
   }

  ngOnInit() {
    this.load();
    setDataTable();
  }

  load(){
    this.eventService.getEvents().subscribe(
      (response:any) => {
        if(response.status == 200){
            this.eventData = response.newsBoard;
            this.loaded =1;
        }
      }
    );
  }


  deleteEvent(id,index){
    const response = this.popUpObject.open(ConstantsData.ARE_YOU_SURE, ConstantsData.DELETE_NOTICE_CONFIRMATION, {
      "callback" : this.delete,
      "params" : [id, index, this]});
  }

  delete(id, index, __this){

    __this.eventService.deleteById(id).subscribe(
     (response : Response) => {
        if(response.status == 200){
          __this.eventData.splice(index,1);
          __this.actionStatus = 1;
          __this.successMessage = ConstantsData.EVENT_DELETE_SUCCESS;
        }
     },
     (error) => {
      __this.actionStatus = 1;
      __this.errorMessage = ConstantsData.ERROR_MESSAGE;
     }
    );

  }

  editEvent(id){
    this.route.navigate(["main","edit-event"], {
      queryParams : { 'id' : id }
    });
  }

}
