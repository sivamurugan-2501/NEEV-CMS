import { Component, OnInit } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { ConfigsDataService } from 'replace/app/services/configs-data.service';
import { ConstantsData } from '../constants-data';
import { Router } from '@angular/router';
import { NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {

  faqs: Array<Object>;
  languages : any;
  actionStatus;
  successMessage="FAQ deleted successfully.";
  errorMessage;
  loadingStatus=1;
  noRecordMessage = ConstantsData.No_FAQ_MESSAGE;
  answerCol;

  popupObject : NgbdModalComponent;

  constructor(private faqService : FaqService, private configService: ConfigsDataService, private route: Router, private modalService: NgbModal) { 
      this.popupObject = new NgbdModalComponent(modalService);
  }

  ngOnInit() {
    this.load();
    this.configService.getLanguages().subscribe((response:any)=>{
      this.languages = response.data;
    });
  }

  load(){
    this.loadingStatus=1;
    this.faqService.getFAQs(0).subscribe(

      (response:any) => {
          if(response.status== 200){
            
            this.faqs = response.faqs;
            this.loadingStatus=0;
          }
      }


    );
  }


  deleteFAQ(id, index){

    this.popupObject.open(ConstantsData.ARE_YOU_SURE, "You won't be able to access this FAQ", {
      "callback" : this.delete,
      "params" : [id, index, this]
    });
  }

  delete(id, index, __this){

    //const confirmation= confirm("Are you sure that you want to delete this FAQ ?");

   // if(confirmation){
    __this.faqService.deleteById(id).subscribe(
        (response:any) => {
            if(response.status == 200){
              __this.actionStatus = 1;
              __this.faqs.splice(index,1);
            }
        }
      );
    //}
    
  }

  editFAQ(id, index){
      this.route.navigate(["main", "edit-faq"], {
        queryParams : {
          "id" : id
        }
      });
  }

}
