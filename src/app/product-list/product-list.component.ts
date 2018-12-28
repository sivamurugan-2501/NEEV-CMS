import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ConstantsData } from '../constants-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:any;
  loading =0;
  serverBaseURL;
  noRecordMessage = ConstantsData.noBannerMessage;
  actionStatus;

  constructor(private productService: ProductService, private route :Router) { }

  ngOnInit() {
      this.load();
  }

  load(){
    this.productService.getProducts().subscribe(
      (response:any) =>  {
        this.loading=1;
        if(response.status == 200){
            
            this.products = response.products;
            this.serverBaseURL = response.baseURL;
        }
      }  
    );
  }

  editVideo(id){
    this.route.navigate(["main","edit-product"], {
      'queryParams' : {  'id' : id }
    });
  }
}
