import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIGS } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private htttp: HttpClient) { }

  addProduct(productData){

    return this.htttp.post(CONFIGS["apiBaseURL"]+CONFIGS["apiURLs"]["product"]["add"], productData);
  
  }
}
