import { Component, OnInit } from '@angular/core';
import { BusinessOppService } from '../services/business-opp.service';
import { CONFIGS } from '../config';
import { NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantsData } from '../constants-data';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-business-oppor-list',
  templateUrl: './business-oppor-list.component.html',
  styleUrls: ['./business-oppor-list.component.css']
})
export class BusinessOpporListComponent implements OnInit {

  businessOppData=null;

  popUpObject : NgbdModalComponent;
  multipPopup : NgbdModalComponent;

  actionStatus =-1;
  successMessage = "Business opportunity deleted successfully";
  errorMessage= "Something went wrong";

  constructor( modalService: NgbModal, private businessService: BusinessOppService, private route : Router){
        this.popUpObject = new NgbdModalComponent(modalService);
       this.multipPopup =  new NgbdModalComponent(modalService);
  }


  ngOnInit() {
      this.load();
  }


  load(){
    this.businessService.get().subscribe(
      (response:any) => {
          if(response.status == 200){
              this.businessOppData = response.data;
          }
      }
    );
  }

  delete(id, index){

    this.popUpObject.open(ConstantsData.ARE_YOU_SURE, " You wont be able to access this business opportunity", {
      "callback" : this.deleteBusi,
      "params" : [id, index, this]
    });
  }

  deleteBusi(id, index, __this){

    //alert(__this.businessService);
    //__this.actionStatus =-1;
    
    __this.businessService.delete(id).subscribe(

          (response:any) => {
            if(response.status == 200){
                __this.businessOppData.splice(index,1);
                __this.actionStatus =1;
            }
          },
          (error:any) => {
            __this.actionStatus =2;
          }
    );

}


edit(id){
    this.route.navigate(["main", "edit-business-oppor",{
       queryParams : {
          "id" : id
       }
    }]);
}

}
