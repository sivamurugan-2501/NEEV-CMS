import { Component, OnInit } from '@angular/core';
import { DealerAddRequest } from '../model/dealer-add-request';
import { StorageService } from '../services/storage.service';
import { DealerService } from '../services/dealer.service';

@Component({
  selector: 'app-dealer-add',
  templateUrl: './dealer-add.component.html',
  styleUrls: ['./dealer-add.component.css']
})
export class DealerAddComponent implements OnInit {

  dealerData:DealerAddRequest = {
    name: null,
    dealer_code: null,
    address: null,
    state: 0,
    region : 0,
    taluka: null,
    source:1
  }

  states:any;
  regions:any;


 
  actionStatus=0;
  successMessage = "New TGM added successfully";
  errorMessage = "Something went wrong.";

  constructor(private storageService: StorageService, private dealerService:DealerService) { }

  ngOnInit() {

    const states = this.storageService.getCustomData("STATES");

    try{
      this.states = JSON.parse(states);
    }catch(e){
      this.states = states;
    }

    const regions = this.storageService.getCustomData("REGIONS");

    try{
      this.regions = JSON.parse(regions);
    }catch(e){
    
      this.regions = regions;
    }

  }

  addDealer(){
    
    this.dealerService.add(this.dealerData).subscribe(

      (response:Response) => {

        if(response.status==200){
            this.actionStatus= 1;
        }else{
          this.actionStatus=2;
        }
      },

      (error:any) =>{
        this.actionStatus=2;
        if(error.status !==undefined){
          this.errorMessage = error.message;
        }else{
          this.errorMessage = JSON.stringify(error);
        }

      }

    );
      return false;
  }

}
