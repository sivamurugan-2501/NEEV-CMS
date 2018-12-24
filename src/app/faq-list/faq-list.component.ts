import { Component, OnInit } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { ConfigsDataService } from 'replace/app/services/configs-data.service';

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

  constructor(private faqService : FaqService, private configService: ConfigsDataService) { }

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

    const confirmation= confirm("Are you sure that you want to delete this FAQ ?");

    if(confirmation){
      this.faqService.deleteById(id).subscribe(
        (response:any) => {
            if(response.status == 200){
              this.actionStatus = 1;
              this.faqs.splice(index,1);
            }
        }
      );
    }
    
  }

}
