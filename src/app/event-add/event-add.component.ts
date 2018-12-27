import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { when } from 'q';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  regions:any;
  states:any;

  eventData:any = {
    title :null,
    venue: null,
    when_date : null,
    state : 0,
    region : 0,
    language: 0,
    description : null,
    thumbnail : null,
    images : null,
    videos: null
  }

  imageError: any=null;
  actionStatus =0;
  successMessage = null;
  errorMessage= "Error cocured";
  when_time;
  when_date;

  constructor(private storageService: StorageService, private eventService: EventService, private route: Router) { }

  ngOnInit() {
    
    const region = this.storageService.getCustomData("REGIONS");

    try{
      this.regions = JSON.parse(region);
    }catch(e){
      this.regions = region;
    }

    const states = this.storageService.getCustomData("STATES");

    try{
      this.states = JSON.parse(states);
    }catch(e){
      this.states = states;
    }
  }

  onFileChange(event){
    
    this.eventData.thumbnail = null;
    this.imageError = null;
    const file: File  = event.target.files[0];
    const type = file.type;
    try{
      const extension = type.split("/")[1];
      if(["png", "jpeg", "jpg"].indexOf(extension.toLocaleLowerCase()) > -1){
        this.eventData.thumbnail = file;
      }else{
        this.imageError = "Invalid image file, only .png, .jpg and  .jpeg are accepted.";
        return false;
      }
    }catch(e){
      console.log(e);
    }
  }

  saveEvent(){
    var event = new FormData();

    const date = this.when_date;
    
    const when_date = new Date(date);
    
   //alert(this.when_time);
  
    this.eventData["when_date"] = when_date.getFullYear()+"-"+ (when_date.getMonth()+1)+"-"+when_date.getDate()+" "+
                                 ( (this.when_time!==undefined) ? this.when_time : "" );

    //alert(this.eventData["when_date"]);

    let keys = Object.keys(this.eventData);
  
    for(let i=0;i<keys.length;i++){
      //alert(this.bannerData[keys[i]]);
      if(keys[i] == "thumbnail"){
          event.append(keys[i], this.eventData.thumbnail, this.eventData.thumbnail["name"]);
      }else{
        event.append(keys[i], this.eventData[keys[i]]);
      }
      
    }
    const __this = this;
    this.eventService.addEvent(event).subscribe(
      response => {
        this.actionStatus=1;
        this.successMessage = "New event added successfully";
        const redirect = function(){ __this.route.navigate(["main", "event-list"]); };
        setTimeout(function(){
          redirect();
        }, 3000);
      },
      error => {
        this.actionStatus = 2;
        this.errorMessage = "Something went wrong";
      }
    );
    
}

}
