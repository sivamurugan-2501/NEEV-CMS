import { Component, OnInit } from '@angular/core';
import { ConfigsDataService } from '../services/configs-data.service';
import { FAQAddRequest} from '../model/faq-add-request';
import { FaqService } from '../services/faq.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-faq-add',
  templateUrl: './faq-add.component.html',
  styleUrls: ['./faq-add.component.css']
})
export class FaqAddComponent implements OnInit {

  faqData:FAQAddRequest = {
    language: null,
    question: null,
    answer: null
  }

  languages;

  actionStatus= -1;

  successMessage = "FAQ added successfully.";
  errorMessage = "Something went wrong.";

  constructor(private configService: ConfigsDataService, private faqService: FaqService, private route: Router) { }

  ngOnInit() {

    // load language

    this.configService.getLanguages().subscribe((response:any)=>{
      if(response.status == 200){
        this.languages = response.data;
      }
    });

  }

  saveFAQ(){

      this.faqService.addFaq(this.faqData).subscribe(
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
