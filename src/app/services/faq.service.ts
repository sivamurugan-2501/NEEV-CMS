import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FAQAddRequest } from '../model/faq-add-request';
import { CONFIGS } from  './../config';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }

  addFaq(faqData: FAQAddRequest){

    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["faq"]["add"];
    return this.http.post(url, faqData);

  }


  getFAQs(language){

    
    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["faq"]["list"];
    return this.http.get(url);

  }

  deleteById(id){

    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["faq"]["delete"]+"/"+id;
    return this.http.delete(url);

  } 

  getFAQById(id){

    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["faq"]["get"]+"/"+id;
    return this.http.get(url);
  }

  updateFaq(faqData, id){

    const url = CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["faq"]["update"]+"/"+id;
    return this.http.post(url, faqData);
  }

}
