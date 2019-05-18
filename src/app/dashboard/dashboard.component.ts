import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { StorageService } from '../services/storage.service';

declare function setDataTable():any;
declare function reInitializeDB():any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUsers=0;
  totaAppEnq=0;
  states= null;
  filter = {
    state :  0
  }
  constructor(private statsService: StatsService, private storageService: StorageService) { }

  ngOnInit() {
    this.load(0);
    setTimeout( ()=>{
      //select2Fn();
      setDataTable();
      //alert("loadedd");
    },2000);
    const states = this.storageService.getCustomData("STATES");

    try{
      this.states = JSON.parse(states);
    }catch(e){
      this.states = states;
    }
  }

  load(state){
    this.statsService.getStats(state).subscribe(
       (response:any) => {
          if(response.status == 200){
              const data = response.data;
              this.totalUsers = data.totalUsers;
              this.totaAppEnq = data.totalAppEnq;
              
          }
       } 
    );
  }

  filteronState(){
    //alert("called");
    this.load(this.filter.state);
    reInitializeDB();
    setTimeout( ()=>{
      //select2Fn();
      setDataTable();
      //alert("loadedd");
    },500);
  }

}
