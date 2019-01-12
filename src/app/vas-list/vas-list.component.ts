import { Component, OnInit } from '@angular/core';
import { NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstantsData } from '../constants-data';
import { Route, Router } from '@angular/router';
import { VasService } from '../services/vas.service';

@Component({
  selector: 'app-vas-list',
  templateUrl: './vas-list.component.html',
  styleUrls: ['./vas-list.component.css']
})
export class VasListComponent implements OnInit {

  vasData:any;
  popUpObject : NgbdModalComponent;
  multipPopup : NgbdModalComponent;

  actionStatus =-1;
  successMessage = "Business opportunity deleted successfully";
  errorMessage= "Something went wrong";

  noRecordMessage = "It seems you have not added any VAS yet.";

  constructor(modalService: NgbModal, private vasService: VasService, private route : Router) { 
    this.popUpObject = new NgbdModalComponent(modalService);
    this.multipPopup =  new NgbdModalComponent(modalService);
  }

  ngOnInit() {
      this.load();
  }


  load(){
    this.vasService.get().subscribe(
      (response:any) => {
          if(response.status == 200){
              this.vasData = response.data;
          }
      }
    );
  }

  delete(id, index){

    this.popUpObject.open(ConstantsData.ARE_YOU_SURE, " You wont be able to access this VAS", {
      "callback" : this.deleteVas,
      "params" : [id, index, this]
    });
  }

  deleteVas(id, index, __this){

    //alert(__this.businessService);
    //__this.actionStatus =-1;
    
    __this.vasService.delete(id).subscribe(

          (response:any) => {
            if(response.status == 200){
                __this.vasData.splice(index,1);
                __this.actionStatus =1;
            }
          },
          (error:any) => {
            __this.actionStatus =2;
          }
    );

}


editThis(id){
    this.route.navigate(["main", "edit-vas"], {"queryParams" : {"id": id} });
}

}
