import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ConstantsData } from '../constants-data';
import { Router } from '@angular/router';

declare function setDataTable():any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:any;
  products_actuals:any;
  loading =0;
  serverBaseURL;
  noRecordMessage = ConstantsData.noBannerMessage;
  actionStatus;
  category_selected=0;

  constructor(private productService: ProductService, private route :Router) { }

  ngOnInit() {
      this.load();

      setTimeout( ()=>{
        setDataTable();
      },2000)
  }

  load(){
    this.productService.getProducts().subscribe(
      (response:any) =>  {
        this.loading=1;
        if(response.status == 200){
            
            this.products = this.products_actuals =response.products;
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

  filterOnCategory(){
    const category = this.category_selected;
    if(category>0){
      this.products = this.products_actuals.filter( (data:any) => {
         return (data.category==category)
      });
    }else{
      this.products = this.products_actuals;
    }
  }
}
