import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ConstantsData } from '../constants-data';
import { when } from 'q';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  instanceId:number;
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
    videos: null,
    notify:0
  }

  imageError: any=null;
  actionStatus =0;
  successMessage = null;
  errorMessage= "Error cocured";
  when_time;
  when_date;

  regions:any;
  states:any;

  imageRemoved=0;
  file_id;
  file_to_delete:Array<any>;
  previewImage;

  months_array = ConstantsData.MONTHS;

  constructor(private eventService: EventService, private aRoute:ActivatedRoute, private storageService:StorageService, private route: Router) { }

  ngOnInit() {
      this.aRoute.queryParams.subscribe(
        
        (q) => {
       
        if(q.id && !isNaN(q.id) && q.id>0){
          //alert(q.id);
          this.instanceId = q.id;
          this.loadData(this.instanceId);
        }else{
          //alert("id not set");
        }
        
      });


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

  loadData(id){
    //alert("load");
    this.when_time = "02:05";
    this.eventService.getById(id).subscribe(

      (response:any) => {
        if(response.status==200){
          this.eventData = response.newsBoard;
          this.createPreview(response.baseURL);
          this.formatWhenDate(this.eventData.when_date)
        }
      }

    );
  }


  saveEvent(){
        var event = new FormData();

        const date = this.when_date;
        
        const when_date = new Date(date);
      
        this.eventData["when_date"] = when_date.getFullYear()+"-"+ (when_date.getMonth()+1)+"-"+when_date.getDate()+" "+
                                    ( (this.when_time!==undefined) ? this.when_time : "" );


        let keys = Object.keys(this.eventData);
      
        for(let i=0;i<keys.length;i++){
          //alert(this.eventData[keys[i]]);
          if(keys[i] == "thumbnail"){

              if(this.eventData.thumbnail){
                event.append(keys[i], this.eventData.thumbnail, this.eventData.thumbnail["name"]);
              }else{
                event.append(keys[i],null);
              }

          }else if(keys[i]!="thumbnail_id" && keys[i]!="created_by" && keys[i]!="id" && keys[i]!="city" ){
            event.append(keys[i], this.eventData[keys[i]]);
          }          
        }
        event.append("videos",null);
        event.append("images", null);
        event.append("filesToDelete", ( (this.file_to_delete && this.file_to_delete[0]) ? this.file_to_delete[0] : null ) );

        const __this = this;
        this.eventService.updateEvent(this.instanceId, event).subscribe(
            response => {
              window.scroll(0,0);
              this.actionStatus=1;
              this.successMessage = "Notice updated successfully";
              const redirect = function(){ __this.route.navigate(["main", "event-list"]); };
              
              setTimeout(function(){
                redirect();
              }, 1000);
            },
            error => {
              this.actionStatus = 2;
              this.errorMessage = "Something went wrong";
            }
        );
        
    }


    createPreview(baseURL){
      const image = this.eventData.thumbnail;
      this.previewImage = image;
    }
  
    removeFile(){
        this.imageRemoved =1;
        this.file_id = this.eventData.thumbnail_id;
        this.eventData.thumbnail_id = null;
        this.file_to_delete.push(this.file_id);
    }
  
    undoRemoved(){
      this.imageRemoved=0;
      this.file_to_delete.pop();
      this.eventData.thumbnail_id = this.file_id;
      this.file_id= null;
    }

    formatWhenDate(when_date){
      
      let when_time = when_date.split(" ");
      this.when_time = (when_time && when_time[1]) ? when_time[1] : null;

      const when_date_formatted =  formatDate(when_date, "yyyy-MM-dd", "en-US");
      
      //alert(when_date_formatted);
      this.eventData.when_date =   this.when_date = when_date_formatted;


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
  
}
