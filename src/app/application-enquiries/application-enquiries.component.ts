import { Component, OnInit } from '@angular/core';
import { AppEnquiriesService } from '../services/app-enquiries.service';

@Component({
  selector: 'app-application-enquiries',
  templateUrl: './application-enquiries.component.html',
  styleUrls: ['./application-enquiries.component.css']
})
export class ApplicationEnquiriesComponent implements OnInit {

  appEnqData;
  
  constructor(private applService: AppEnquiriesService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.applService.get().subscribe(
       (response:any) => {
          if(response.status == 200){
             this.appEnqData = response.data;
          }
       }
    );
  }

}
