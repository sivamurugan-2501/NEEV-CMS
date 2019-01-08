import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ConstantsData } from '../constants-data';
import { Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopupsComponent, NgbdModalComponent } from '../custom-popups/custom-popups.component';

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

  popUpObject : NgbdModalComponent;

  constructor(private productService: ProductService, private route :Router, private modalService: NgbModal) { 
    this.popUpObject = new NgbdModalComponent(modalService);
  }

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


  deleteThis(id, index){
    const response = this.popUpObject.open(ConstantsData.ARE_YOU_SURE, ConstantsData.DELETE_PRODUCT_CONFIRMATION, {
      "callback" : this.delete,
      "params" : [id, index, this]});
  }


  // used as callback function in custompopup component
  delete(id, index, __this){
   
    __this.productService.deleteProduct(id).subscribe(
      (response:Response) => {  
        if(response.status == 200){
          __this.actionStatus=1;
          __this.successMessage = "Product deleted successfully";
          __this.products.splice(index,1);
        }
      },
      (error) => {
        __this.actionStatus = 2;
        __this.errorMessage = "Something went wrong";
      }
    );
  }
  


}
