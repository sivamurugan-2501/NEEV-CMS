import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ConstantsData } from '../constants-data';
import { Router } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopupsComponent, NgbdModalComponent } from '../custom-popups/custom-popups.component';
import { StorageService } from '../services/storage.service';

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
  serverBaseURL="";

  actionStatus;
  category_selected=0;

  @Input() master: Boolean= false;
  noRecordMessage = ConstantsData.noProductMessage ; 
  noRecordMessage2 = ConstantsData.noProductMasterMessage ; 
  popUpObject : NgbdModalComponent;

  languages:any;

  constructor(private productService: ProductService, private route :Router, private modalService: NgbModal, private storageService: StorageService) { 
    this.popUpObject = new NgbdModalComponent(modalService);
    //this.noRecordMessage = (!this.master) ? ConstantsData.noProductMessage : ConstantsData.noProductMasterMessage;
  }

  ngOnInit() {
      this.load();

      setTimeout( ()=>{
        setDataTable();
      },2000);

      const languages = this.storageService.getCustomData("LANGUAGES");

      try{
        this.languages = JSON.parse(languages);
      }catch(e){
        this.languages = languages;
      }

      this.getLanguageText(1);
  }

  load(){
    this.productService.getProducts(null, (this.master ? 1 : 0) ).subscribe(
      (response:any) =>  {
        this.loading=1;
        if(response.status == 200){
            
            this.products = this.products_actuals =response.products;
            //this.serverBaseURL = response.baseURL;
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

    const deleteConfirmation = (this.master) ? "This master product and it's related product won't be accessible once deleted" : ConstantsData.DELETE_PRODUCT_CONFIRMATION;

    const response = this.popUpObject.open(ConstantsData.ARE_YOU_SURE, deleteConfirmation, {
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

  
  getLanguageText(langId){
    const langText =  this.languages.filter(
      (element) => {
          return (element.id == langId);
      }
    );
    console.log(langText);
    return (langText && langText[0] && langText[0]["name"]) ? langText[0]["name"] : "-";
  }


}
