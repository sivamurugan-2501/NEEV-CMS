import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ConstantsData } from '../constants-data';
import { Router } from '@angular/router';

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

  constructor(private eventService: EventService, private route: Router) { }

  ngOnInit() {
    this.load();
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

  deleteEvent(id, index){

    this.eventService.deleteById(id).subscribe(
     (response : Response) => {
        if(response.status == 200){
            this.eventData.splice(index,1);
            this.actionStatus = 1;
            this.successMessage = ConstantsData.EVENT_DELETE_SUCCESS;
        }
     },
     (error) => {
      this.actionStatus = 1;
      this.errorMessage = ConstantsData.ERROR_MESSAGE;
     }
    );

  }

  editEvent(id){
    this.route.navigate(["main","edit-event"], {
      queryParams : { 'id' : id }
    });
  }

}
