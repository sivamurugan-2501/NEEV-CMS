import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import { DropzoneDirective, DropzoneComponent, DropzoneModule } from 'ngx-dropzone-wrapper';
import { ConfigsDataService } from '../services/configs-data.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  imagePreview: Array<Object>= new Array();
  allImageList: Array<File>= new Array();
  imageError =null;
  brochureError= null;

  IMAGE_EXTENSTIONS_ALLOWED = ["png", "jpg", "jpeg"];
  CATEGORY_OPTIONS = [
      {name : "Category1", value :1 }, 
      {name : "Category2" , value :2 }
    ];

  languages :any;

  productData = {
    title : null,
    images: null,
    brochureFile : null,
    category :0,
    language: 0,
    specification : null,
    features : null
  }

  actionStatus =-1;
  successMessage = "Success";
  errorMessage = "Error";

  constructor(private configService: ConfigsDataService, private productService: ProductService) { }

  ngOnInit() {
    this.loadLanguageList();
  }


  onFileChange(event){
    
    const files : Array<File> = event.target.files;

    if(this.allImageList.length >= 5 || (this.allImageList.length + files.length) >=5 ){

       this.imageError = "Maxmimum 5 files allowed.";
       return false;

    }

    this.imageError=null;

    var fileReader = new FileReader();

    const this_c =this;
    
    fileReader.addEventListener("load", function(){
      
      const image_data = fileReader.result;
      this_c.imagePreview.push(image_data);
      console.log(this_c.imagePreview);

    }, false);

    //this.imagePreview = fileReader.readAsDataURL(event.target.files[0]);
    
    
    for(let i=0;i<files.length; i++){

      const file = files[i];

      const validFile = this.checkExtension(file, this.IMAGE_EXTENSTIONS_ALLOWED);
      if(!validFile){
        this.imageError = "Invalid image selected, allowed "+this.IMAGE_EXTENSTIONS_ALLOWED;
        continue;
      }
      console.log(file);

      this.allImageList.push(file);

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
        this.productData.brochureFile = file;
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
      
      let keys = Object.keys(this.productData);
    
      for(let i=0;i<keys.length;i++){
        //alert(this.bannerData[keys[i]]);
        if(keys[i] == "images"){
          alert(keys[i]);
            
          this.allImageList.forEach(function(file, index){
            const keyName = keys[i]+"["+index+"]";
            product.append( keyName, file, file["name"]);
          });
          //let file = this.allImageList[0] ;//this.productData[keys[i]];


            

        }else if(keys[i] == "brochureFile"){
         
          let file = this.productData[keys[i]];
          product.append(keys[i], file, file["brochureFile"]);

        }else{
           product.append(keys[i], this.productData[keys[i]]);
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
