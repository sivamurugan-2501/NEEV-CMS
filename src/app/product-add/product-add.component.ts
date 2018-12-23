import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import { DropzoneDirective, DropzoneComponent, DropzoneModule } from 'ngx-dropzone-wrapper';
import { ConfigsDataService } from '../services/configs-data.service';
import { ProductService } from '../services/product.service';
import { ConstantsData } from '../constants-data';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  imagePreview: Array<Object>= new Array();
  featureImagePreview: Array<Object>= new Array();
  galleryImagesPreview: Array<Object> = new Array();

  allImageList: Array<File>= new Array();
  featureImage: Array<File>= new Array();
  galleryImages: Array<File>= new Array();

  imageError =["", "", ""];
  brochureError= null;
  logoError =null;
  IMAGE_EXTENSTIONS_ALLOWED = ["png", "jpg", "jpeg"];
  CATEGORY_OPTIONS = ConstantsData.CATEGORY_OPTIONS;

  languages :any;

  productData_1 = {
    title : null,
    logo: null,
    //brochureFile : null,
    category :1,
    language: 0,
    //specification : null,
   // features : null
  }

  productData_feature = {
    title : null,
    image :  null,
    description : null
  };

  productData_gallery = {
    title : null,
    images : null
  };

  productData_brochure = {
    brochureFile : null
  }

  productData_specification ={
    engine:null,
    clutch: null,
    suspension: null,
    steering : null,
    tyres :null
  }

  actionStatus =-1;
  successMessage = "Success";
  errorMessage = "Error";

  featureImageError = null;

  constructor(private configService: ConfigsDataService, private productService: ProductService, private storageService: StorageService) { }

  ngOnInit() {
    this.loadLanguageList();
  }


  onImageSelect(event, multiple, from){
    
    const files : Array<File> = event.target.files;

    if(multiple==true){
      if(this.allImageList.length >= 5 || (this.allImageList.length + files.length) >=5 ){

        this.logoError = "Maxmimum 5 image allowed.";
        return false;
      }
    }else{
      if(this.allImageList.length >= 1 ){

        this.logoError = "Maxmimum 1 image allowed.";
        return false;
      }
    }

    this.logoError=null;
    this.featureImageError = null;

    var fileReader = new FileReader();

    const this_c =this;
    
    fileReader.addEventListener("load", function(){
      
      const image_data = fileReader.result;

      // 1 logo image, 2 Feature image, 3 gallery images
      if(from ==1){

        this_c.imagePreview.push(image_data);
        console.log(this_c.imagePreview);

      }else if(from == 2){

        this_c.featureImagePreview.push(image_data);
        console.log(this_c.imagePreview);

      }else if(from ==3){

        this_c.galleryImagesPreview.push(image_data);
        console.log(this_c.imagePreview);

      }
     
    }, false);

    //this.imagePreview = fileReader.readAsDataURL(event.target.files[0]);
    
    
    for(let i=0;i<files.length; i++){

      const file = files[i];

      const validFile = this.checkExtension(file, this.IMAGE_EXTENSTIONS_ALLOWED);
      if(!validFile){
        this.imageError[from] = "Invalid image selected, allowed "+this.IMAGE_EXTENSTIONS_ALLOWED;
        continue;
      }

      if(from==1){
        this.allImageList.push(file);
      }else  if(from==2){
        this.featureImage.push(file);
      }else if(from==3){
        this.galleryImages.push(file);
      }


      if(file){
        fileReader.readAsDataURL(file);
      }

    }

  }

  createPreview(){

  }

  removeFile(i){
      this.imagePreview.splice(i,1);
      this.allImageList.splice(i,1);
  }

  validateBrochure($event){

    this.brochureError = null;
    var fileReader = new FileReader();
    const this_c =this;
    const file:File = $event.target.files[0];

    if(this.checkExtension(file, ["pdf"])){

      if(file.size <=3000){
        this.brochureError = "File size cannot exceed 3 MB, "+ file.size / 1000+ " provided";
      }else{
        this.productData_brochure.brochureFile = file;
      }

    }else{
      this.brochureError = "Invalid brochure file, only pdf allowed";
    }

  }

  loadLanguageList(){
    this.configService.getLanguages().subscribe( (response:any) => {
      if(response.status = "200"){
        this.languages = response.data;
      }
    });
  }


  checkExtension(file:File, allowedExtension:Array<String>){
    try{
      const type = file.type;
      const extenstion = type.split("/");

      if(allowedExtension.indexOf(extenstion[1])>-1){
          return true;
      }else{
        return false;
      }

    }catch(e){
      console.error(e);
    }
    return false;
  }

  saveProduct(){
     
      var product = new FormData();
      
      let keys = Object.keys(this.productData_1);
    
      for(let i=0;i<keys.length;i++){
        //alert(this.bannerData[keys[i]]);
        if(keys[i] == "images"){
          alert(keys[i]);
            
          this.allImageList.forEach(function(file, index){
            const keyName = keys[i]+"["+index+"]";
            product.append( keyName, file, file["name"]);
          });
          //let file = this.allImageList[0] ;//this.productData_1[keys[i]];


            

        }else if(keys[i] == "brochureFile"){
         
          let file = this.productData_1[keys[i]];
          product.append(keys[i], file, file["brochureFile"]);

        }else{
           product.append(keys[i], this.productData_1[keys[i]]);
        }
        
      }
      this.productService.addProduct(product).subscribe(
        response => {
          this.actionStatus=1;
          this.successMessage = "New banner added successfully";
          alert(response);
        },
        error => {
          this.actionStatus = 2;
          this.errorMessage = "Something went wrong";
        }
      
      );
      
    return false;
  }

  
}
