import { Component, OnInit } from '@angular/core';
import { FaqService } from '../services/faq.service';
import { ConfigsDataService } from 'replace/app/services/configs-data.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {

  faqs: any;
  languages : any;

  constructor(private faqService : FaqService, private configService: ConfigsDataService) { }

  ngOnInit() {
    this.load();
    this.configService.getLanguages().subscribe((response:any)=>{
      this.languages = response.data;
    });
  }

  load(){
    this.faqService.getFAQs(0).subscribe(

      (response:any) => {
          if(response.status== 200){
            alert
            this.faqs = response.faqs;
          }
      }


    );
  }

}
