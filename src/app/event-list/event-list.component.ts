import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

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

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  load(){
    this.eventService.getEvents().subscribe(
      (response:any) => {
        if(response.status == 200){
            this.eventData = response.data;
            this.loaded =1;
        }
      }
    );
  }

}
