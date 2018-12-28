import { Component, OnInit } from '@angular/core';
import { ConfigsDataService } from '../services/configs-data.service';
import { FAQAddRequest} from '../model/faq-add-request';
import { FaqService } from '../services/faq.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.css']
})
export class FaqEditComponent implements OnInit {

  faqData:FAQAddRequest = {
    language: 0,
    question: null,
    answer: null
  }

  languages;

  actionStatus= -1;

  successMessage = "FAQ added successfully.";
  errorMessage = "Something went wrong.";
  instanceId=0;

  constructor(private configService: ConfigsDataService, private faqService: FaqService, private route: Router,private aRoute : ActivatedRoute , private storageService:StorageService) { }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(
      (q) => {
          if(q.id && q.id>0){
              this.instanceId = q.id;
              this.loadData();
          }
      }
    );

    const languages = this.storageService.getCustomData("LANGUAGES");

    try{
      this.languages = JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }
  }

  loadData(){
    this.faqService.getFAQById(this.instanceId).subscribe(
      (response:any) => {
        if(response.status == 200){
            this.faqData = response.faqs;
        }
      }
    );
  }


  saveFAQ(){

    this.faqService.updateFaq(this.faqData, this.instanceId).subscribe(
      (response : Response) =>{
        if(response.status == 200){
            this.actionStatus = 1;
            const __this = this;
           
            setTimeout(function(){
              __this.route.navigate(["main","faq-list"]);
            },3000);
        }
      },

      (error) =>{
        this.actionStatus = 2;
      }
    );
    return false;
}

}
