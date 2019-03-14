import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';

declare function setDataTable():any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUsers=0;
  totaAppEnq=0;
  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.load();
    setDataTable();
  }

  load(){
    this.statsService.getStats().subscribe(
       (response:any) => {
          if(response.status == 200){
              const data = response.data;
              this.totalUsers = data.totalUsers;
              this.totaAppEnq = data.totalAppEnq;
          }
       } 
    );
  }

}
