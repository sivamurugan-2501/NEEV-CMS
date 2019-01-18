import { Component, OnInit } from '@angular/core';
import { ConfigsDataService } from '../services/configs-data.service';
import { ProductService } from '../services/product.service';
import { ConstantsData } from '../constants-data';
import { StorageService } from '../services/storage.service';
import {  Router, ActivatedRoute } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopupsComponent, NgbdModalComponent } from '../custom-popups/custom-popups.component';

import { NgbdModalComponent2 } from '../multipurpose-popup/multipurpose-popup.component';

import { ProductEdit } from './product-edit';
import { VideoService } from '../services/video.service';

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

  featureImage_loaded: Array<File>= new Array();
  galleryImages_loaded: Array<File>= new Array();


  imageError =["", "", ""];
  brochureError= null;
  logoError =null;
  IMAGE_EXTENSTIONS_ALLOWED = ["png", "jpg", "jpeg"];
  CATEGORY_OPTIONS = ConstantsData.CATEGORY_OPTIONS;

  languages :any;

  productData_1:any = {
    title : null,
    logo: null,
    category :1,
    language: 0,
    productImage: null,
    notify: 0
  }

  feature_json =  {
    id: null,
    title : null,
    image :  null,
    description : null
  };

  productData_feature:Array<Object> =  new Array(); 

  productData_feature_images:Array<Object> = new Array();

  productData_gallery = {
    title : null,
    images : null,
    existing_images : new Array()
  };

  productData_brochure = {
    id: null,
    title: null,
    brochureFile : null
  }

  productData_specification ={
    engine: new Array(),
    clutch: new Array(),
    suspension: new Array(),
    steering : new Array(),
    tyres :new Array()
  }

  productData_video = {
    title : null,
    type: 1,
    videoFile : null,
    url : null,
    language : this.productData_1.language,
    thumbnailImage : null,
    downloadable : 0,
    category :  1,
    notify:0,
    product : 0
  }

  videoUploadTypeOptions = [
    {name :"File", value: 1},
    {name :"URL", value: 2}
 ]

  
  successMessage = "Success";
  errorMessage = "Error";

  featureImageError = null;
  max_features =5;
  max_features_arr = new Array(this.max_features);

  max_specs_columns = 10;
  max_specs_arr = new Array(this.max_specs_columns);

  product_specc_property_schema = {
    id : null,
    name : null,
    value : null
  };

  videoValid = null;
  videoError = null;

  actionStatus = [-1,-1,-1,-1,-1];
  successMessages = new Array(5);
  errorMessages = new Array(5);

  instanceId = false;
  productDetails:any= null;

  baseURL = "";

  logoImage=null;
  productImage_1=null;
  productImage:Array<Object>=new Array();;
  productImagePreview:Array<Object>= new Array();
  logoId=0;

  popUpObject : NgbdModalComponent;
  mpPopup : NgbdModalComponent2;

  brochureId=0;
  brochureName = "";

  doc_remove:Array<Object> = new Array();
  docRemoved =0;

  logo_delete:Array<Object> = new Array();
  logoRemoved =0;

  productImage_delete:Array<Object> = new Array();
  productImageId=0;
  productImageRemoved=0;
  productImageError=null;
  feature_image_to_delete:Array<Object> = new Array();
  videoFilePath =null;
  videoFileId:any = null;
  videoFileName:any = null;

  video_delete:Array<Object> = new Array();
  videoRemoved =0;
  vId=0;

  constructor(private route : Router, private aRoute: ActivatedRoute , private configService: ConfigsDataService, private productService: ProductService, private storageService: StorageService, private modalService: NgbModal, private videoService: VideoService) {
    this.popUpObject = new NgbdModalComponent(modalService);
    this.mpPopup = new NgbdModalComponent2(modalService);
   }

  ngOnInit() {

    this.aRoute.queryParams.subscribe( (q) => {
      if(q && q.id){
        this.instanceId = q.id;
        this.loadProductData(this.instanceId);
      }
    });

    this.loadLanguageList();
    this.addNewFeature();

    
   // if(this.productData_specification.engine.length ==0){
    this.addSpecColumn(0);
    /*
    this.addSpecColumn(1);
    this.addSpecColumn(2);
    this.addSpecColumn(3);
    this.addSpecColumn(4);*/
  }


  loadProductData(productId){
    
    this.productService.getProductById(productId).subscribe(
        (response:any) => {
            if(response.status == 200 && response.products){
                const baseURL = ""; //this.baseURL = response.baseURL;
                const productDetails = this.productDetails = response.products;
                this.productData_1 = productDetails.basicData;
                this.productData_gallery.title =baseURL+productDetails.basicData.gallery_title;

                if(productDetails.galleryImages){
                  for(let i=0;i<productDetails.galleryImages.length;i++){
                    //this.galleryImagesPreview.push(productDetails.galleryImages[i]["image"]);
                    this.galleryImages_loaded.push(productDetails.galleryImages[i]["image"]);
                    this.productData_gallery.existing_images.push(productDetails.galleryImages[i]["imageid"]);
                  }
                }
                
                this.logoId = productDetails.basicData.logoId;
                //alert(productDetails.basicData.logo);
                if(productDetails.basicData.logo){
                    //const logoImage = this.logoImage = baseURL+"/"+productDetails.basicData.logo;
                    const logoImage = this.logoImage = productDetails.basicData.logo;
                   // alert(logoImage);
                    //this.imagePreview.push(logoImage);
                }

                if(productDetails.basicData.productImage){
                  const productImage = this.productImage_1 = productDetails.basicData.productImage;
                  this.productImageId = productDetails.basicData.productImageId;
                  //this.imagePreview.push(logoImage);
                }


                console.log(productDetails.specifications);
                if(productDetails.features.length>0){
                  this.productData_feature = productDetails.features;

                   for(let i=0; i < productDetails.features.length; i++){
                     this.productData_feature_images[i] = { "id" :productDetails.features[i]["image"], "image" : productDetails.features[i]["imagePath"]  }
                   } 
                  //alert(JSON.stringify(this.productData_feature));
                }

                for(let i=0; i< productDetails.specifications.length; i++){

                  const specs =  productDetails.specifications[i];
                  
                  const spec = {id: specs.id, name: specs.title, value: specs.description}

                  if(specs["specification"]==1){
                    this.productData_specification.engine.push(spec);
                  }
                  /*else if(specs["specification"]==2){
                    this.productData_specification.clutch.push(spec);
                  }else if(specs["specification"]==3){
                    this.productData_specification.suspension.push(spec);
                  }else if(specs["specification"]==5){
                    this.productData_specification.steering.push(spec);
                  }else if(specs["specification"]==4){
                    this.productData_specification.tyres.push(spec);
                  }*/

                }
                
                if(this.productData_specification.engine.length >1){
                  this.productData_specification.engine.splice(0,1);
                }

                /*if(this.productData_specification.clutch.length >1){
                  this.productData_specification.clutch.splice(0,1);
                }

                if(this.productData_specification.suspension.length >1){
                  this.productData_specification.suspension.splice(0,1);
                }

                if(this.productData_specification.steering.length >1){
                  this.productData_specification.steering.splice(0,1);
                }

                if(this.productData_specification.tyres.length >1){
                  this.productData_specification.tyres.splice(0,1);
                }*/
                console.log(this.productData_specification.engine);
                
                this.productData_brochure.title = this.productData_1.brochure_title;
                //alert(this.productData_brochure.title);
                if(productDetails.brochures){
                  this.productData_brochure.id = this.productDetails.basicData.brochure_file;
                  this.productData_brochure.brochureFile = productDetails.brochures[0]["brochureFile"];
                  this.brochureId = productDetails.brochures[0]["brochureFile"];
                 
                  this.brochureName = productDetails.brochures[0]["actual_name"];
                 // alert( this.brochureName);
                }

                if(productDetails.videos){

                    this.vId = productDetails.videos.vId;
                    this.productData_video.type= productDetails.videos.type;
                    this.productData_video.product = productId;
                    this.productData_video.url = productDetails.videos.url;
                    this.productData_video.videoFile = productDetails.videos.videoFile;

                    this.videoFilePath = productDetails.videos.videoPath;
                    this.videoFileId = productDetails.videos.videoFile;
                    this.videoFileName = productDetails.videos.actual_name;
                }

            }
        }
    );
}


  onImageSelect(event, multiple, from){
    
    //alert(from);
    const files : Array<File> = event.target.files;
    //alert(files);
    if(multiple==true){
      if(this.allImageList.length >= 5 || (this.allImageList.length + files.length) >=5 ){

        this.logoError = "Maxmimum 5 image allowed.";
        return false;
      }
    }else{
     /*  if(this.allImageList.length >= 1 ){

        this.logoError = "Maxmimum 1 image allowed.";
        return false;
      } */
    }

    this.logoError=null;
    this.featureImageError = null;

    

    const __this = this;
    for(let i=0;i<files.length; i++){

      const fileReader = new FileReader();
     // alert(1);
      const file = files[i];

      const validFile = this.checkExtension(file, this.IMAGE_EXTENSTIONS_ALLOWED);
      if(!validFile){
        this.imageError[from] = "Invalid image selected, allowed "+this.IMAGE_EXTENSTIONS_ALLOWED;
        continue;
      }

      if(from==1){
        this.allImageList.push(file);
      }else if(from==2){
       // alert(2);
        this.featureImage.push(file);
        //alert(JSON.stringify(this.featureImage));
      }else if(from==3){
        this.galleryImages.push(file);
      }else if(from==4){
        this.productImage.push(file);
      }

      fileReader.addEventListener("load", function(){
        __this.createPreview(from, fileReader);
      }); 
      if(file){
        setTimeout(()=>{
          fileReader.readAsDataURL(file);
        }, 1000);
       
      }

    }

  }

  createPreview(from, fileReader){
    const this_c =this;
    
    //fileReader.addEventListener("load", function(){
     // alert(1)
      const image_data = fileReader.result;

      // 1 logo image, 2 Feature image, 3 gallery images
      if(from ==1){

        this_c.imagePreview.push(image_data);
        //console.log(this_c.imagePreview);

      }else if(from == 2){

        this_c.featureImagePreview.push(image_data);
        //console.log(this_c.imagePreview);

      }else if(from ==3){
        
        this_c.galleryImagesPreview.push(image_data);
        //console.log(this_c.imagePreview);
      }else if(from ==4){
        
        this_c.productImagePreview.push(image_data);
        //console.log(this_c.imagePreview);
      }
     
   // });
  }

  removeFile(i, from ){

    if(from == 1){
      this.imagePreview.splice(i,1);
      this.allImageList.splice(i,1);
    }else if(from==2){
      this.featureImagePreview.splice(i,1);
      this.featureImage.splice(i,1);
    }else if(from==3){
      this.galleryImagesPreview.splice(i,1);
      this.galleryImages.splice(i,1);
    }else if(from ==4){
      this.productImagePreview.splice(i,1);
      this.productImage.splice(i,1);
    }
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
        //alert("valid");
        this.productData_brochure.brochureFile = file;
      }

    }else{
      this.brochureError = "Invalid brochure file, only pdf allowed";
    }

  }

  loadLanguageList(){
    /*this.configService.getLanguages().subscribe( (response:any) => {
      if(response.status = "200"){
        this.languages = response.data;
      }
    });*/
    const languages = this.storageService.getCustomData("LANGUAGES");
    try{
      this.languages= JSON.parse(languages);
    }catch(e){
      this.languages = languages;
    }
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
     
     /*  var product = new FormData();
      let keys = Object.keys(this.productData_1);
    
      for(let i=0;i<keys.length;i++){
      
        if(keys[i] == "images"){

          this.allImageList.forEach(function(file, index){
            const keyName = keys[i]+"["+index+"]";
            product.append( keyName, file, file["name"]);
          });

        }else if(keys[i] == "brochureFile"){
         
          let file = this.productData_1[keys[i]];
          product.append(keys[i], file, file["brochureFile"]);

        }else{
           product.append(keys[i], this.productData_1[keys[i]]);
        }
        
      } */
      //alert(this.featureImage);
    
      this.mpPopup.open(3, null);
      const product = this.generateProductBasicData();

     

      this.productService.addProduct(product, this.instanceId).subscribe(
        (response:any) => {
          //this.actionStatus=1;
         // this.successMessage = "New banner added successfully";
          //alert(response);
          if(response.status==200 && response.id){

            this.actionStatus[0] = 1;
            if(this.instanceId){
              this.successMessages[0]= "Product updated successfully.";
            }else{
              this.successMessages[0]= "Product created successfully.";
            }

            const productid = this.instanceId = response.id;

           //setTimeout(() => {
              const productVideoPayload = this.generateProductVideoData();
              if(this.vId){
                this.updateVideo(productid, productVideoPayload);
              }else{
                this.addVideo(productid, productVideoPayload);
              }
           //}, 8000);

            const productFeaturesPayload = this.generateProductFeatureData();
            this.updateFeatures(productid, productFeaturesPayload);

            const productSpecsPayload = this.generateProductSpecsData();
            this.updateSpecs(productid, productSpecsPayload);

            const productGalleryPayload = this.generateProductGalleryData();
            this.updateGallery(productid, productGalleryPayload);

          
           

            const productBrochurePayload = this.generateProductBrochureData();
            this.updateBrochure(productid, productBrochurePayload);
            this.mpPopup.dismissModal();
            setTimeout(() => {
                this.route.navigate(["main","product-list"]);
            }, 3000);
           

          }
        },
        error => {
          this.mpPopup.dismissModal();
          this.actionStatus[0] = 2;
          this.errorMessages[0] = "Something went wrong. Product creation failed..";
          
        }
      
      );
      
    return false;
  }

  
  updateFeatures(id, product_features_payload){
    this.productService.updateFeatures(id, product_features_payload).subscribe(
    (response:any) => {
      this.actionStatus[1] = 1;
      this.successMessages[1]= "Features created successfully.";
    },
    
    (error) =>{

      this.actionStatus[1] = 2;
      this.successMessages[1]= "Features creation failed.";  

    }

    );
  }

  updateSpecs(id, product_specs_payload){
    this.productService.updateSpecs(id, product_specs_payload).subscribe(
      (response:any) => {
        this.actionStatus[2] = 1;
        this.successMessages[2]= "Specifications added successfully.";
      },
      
      (error) =>{
  
        this.actionStatus[2] = 2;
        this.successMessages[2]= "Specifications creation failed.";  
  
      });
  }

  updateGallery(id, product_gallery_payload){
    this.productService.updateGallery(id, product_gallery_payload).subscribe(
      (response:any) => {
        
        this.actionStatus[3] = 1;
        this.successMessages[3]= "Product image gallery created successfully.";
      
      },
      
      (error) =>{
  
        this.actionStatus[3] = 2;
        this.successMessages[3]= "Product image gallery creation failed.";  
  
      });
  }

  addVideo(id, product_video_payload:FormData){

    product_video_payload.append("product", id);
    
    //this.productService.updateVideo(id, product_video_payload)
    this.videoService.postProductVideo(product_video_payload, id).subscribe(
      (response:any) => {
        this.actionStatus[4] = 1;
        this.successMessages[4]= "Video uploaded successfully.";
      },
      
      (error) =>{
  
        this.actionStatus[4] = 2;
        this.successMessages[4]= "Video upload failed.";  
  
      });
  }


  updateVideo(id, product_video_payload:FormData){

    product_video_payload.delete("product");
    product_video_payload.append("product",id);
    product_video_payload.append("files_to_delete",null);
    //product_video_payload.files_to_delete = null;

    //this.productService.updateVideo(id, product_video_payload)
    this.videoService.updateVideo( this.vId, product_video_payload).subscribe(
      (response:any) => {
        this.actionStatus[4] = 1;
        this.successMessages[4]= "Video updated successfully.";
      },
      
      (error) =>{
  
        this.actionStatus[4] = 1;
        this.successMessages[4]= "Video updated successfully.";  
  
      });
  }


  updateBrochure(id, product_brochure_payload){
    this.productService.updateBrochure(id, product_brochure_payload).subscribe(
      (response:any) => {
        this.actionStatus[5] = 1;
        this.successMessages[5]= "Brochure uploaded successfully.";
      },
      
      (error) =>{
  
        this.actionStatus[5] = 2;
        this.successMessages[5]= "Brochure upload failed.";  
  
      });
  }

  addNewFeature(){

    if(this.productData_feature.length <= this.max_features ){

      const keys:Array<Object> = Object.keys(this.feature_json);
      var features_schema = {};

      keys.forEach(function(k:string){
        features_schema[k] = null;
      });
    //  alert(JSON.stringify(features_schema));
     // alert(JSON.stringify(features_schema));
      this.productData_feature.push(features_schema);
     // alert(JSON.stringify(this.productData_feature));
    
    }

  }


  // ctagory 1- engine , 2-clutch, 3- suspension, 4-steering, 5-tyres
  addSpecColumn(category){

    const categoryList =[
        "engine", "clutch", "suspension", "steering", "tyres"
    ];

    const categroy_name = categoryList[category];
    //alert(categroy_name);

    if(categroy_name!==undefined && this.productData_specification[categroy_name].length <= this.max_specs_columns ){

      const keys:Array<Object> = Object.keys(this.product_specc_property_schema);
      var specs_schema = {};

      keys.forEach(function(k:string){
        specs_schema[k] = null;
      });
     // alert(JSON.stringify(specs_schema));
      this.productData_specification[categroy_name].push(specs_schema);
      //alert(JSON.stringify(this.productData_specification[categroy_name]));
    
    }

  }



  generateProductBasicData(){
      
    var product = new FormData();
    let keys = Object.keys(this.productData_1);
  
    for(let i=0;i<keys.length;i++){
    
      if(keys[i] == "logo"){

        this.allImageList.forEach(function(file, index){
          const keyName = keys[i];//+"["+index+"]";
          product.append( keyName, file, file["name"]);
        });

      }else if(keys[i] == "productImage"){

        this.productImage.forEach(function(file:any, index){
          const keyName = keys[i];//+"["+index+"]";
          product.append( keyName, file, file["name"]);
        });

      }else if(keys[i]!="galleryImages" && keys[i]!="gallery_title" && keys[i]!="brochure_file" && keys[i]!="logoId" && keys[i]!="productImageId" ){
         product.append(keys[i], this.productData_1[keys[i]]);
      }else if(keys[i]=="logoId"){
          if(!product.get("logo")){
            product.append( "logo", this.productData_1.logoId);
          }
      }else if(keys[i]=="productImageId"){
        if(!product.get("productImage")){
          product.append( "productImage", this.productData_1.productImageId);
        }
    }
      
    }
    return product;

  }

  generateProductFeatureData(){
      
    var productFeatures = new FormData();

    if(this.productData_feature.length>0){

      try{
      const __this = this;
      console.log(__this.featureImage);
      this.productData_feature.forEach(function(feature){
          const keys: Array<Object> = Object.keys(feature);

          keys.forEach(function(k:string){

            console.log(__this.featureImage);
            const file = (__this.featureImage[0]) ? __this.featureImage[0] : null;

          

            console.log(file);

           
           
            if(k == "image"){
              if(file && file!=null && file!=undefined){
                const file_name = (file && file["name"]) ? file["name"] : k;
                productFeatures.append( k+"[]", file, file_name);
              }else{
                productFeatures.append(k+"[]", feature[k]);
              }
            }else{
              productFeatures.append(k+"[]", feature[k]);
            }

          });
      });
      }catch(e){
       // alert(e);
      }
    }

    return productFeatures;
  }


  generateProductSpecsData(){
    return this.productData_specification;
  }

  generateProductGalleryData(){
      
    var product = new FormData();
    let keys = Object.keys(this.productData_gallery);
  
    for(let i=0;i<keys.length;i++){
    
      if(keys[i] == "images"){

        if(this.galleryImages.length>0){
          this.galleryImages.forEach(function(file, index){
            const keyName = keys[i]+"[]";
            product.append( keyName, file, file["name"]);
          });
        }else{
          product.append( keys[i],null );
        }

        if(this.productData_gallery.existing_images && this.productData_gallery.existing_images.length>0){
           product.delete(keys[i]);
           for(let i=0; i< this.productData_gallery.existing_images.length; i++){
              const keyName = keys[i]+"[]";
              product.append(keyName, this.productData_gallery.existing_images[i]);
           }
        }



      }else if(keys[i] == "title"){
        product.append("title", null);
      }else{
         product.append(keys[i]+"[]", this.productData_gallery[keys[i]] );
      }
      
    }
    return product;

  }

  generateProductBrochureData(){

      //alert(this.productData_brochure.file);
      var brochureData = new FormData();

      brochureData.append("id", this.productData_brochure.id);
      brochureData.append("title", this.productData_brochure.title);
      if(this.productData_brochure.brochureFile && this.productData_brochure.brochureFile!==undefined && isNaN(this.productData_brochure.brochureFile) ){
        brochureData.append("brochureFile", this.productData_brochure.brochureFile, this.productData_brochure.brochureFile["name"]);
      }else{
        brochureData.append("brochureFile",this.productData_brochure.brochureFile);
      }
      return brochureData;
  }


  generateProductVideoData(){

    var productVideo = new FormData();

    if(this.productData_video){

      try{
          const keys: Array<Object> = Object.keys(this.productData_video);
          const __this = this;
          keys.forEach(function(k:string){
           
            
            if(k == "videoFile"){

              const file = __this.productData_video.videoFile;
              const file_name = (file["name"]) ? file["name"] : file;
              //alert(file);
              productVideo.append(k, file, file_name);
            }else{
              productVideo.append(k, __this.productData_video[k]);
            }

          });
        }catch(e){
          //alert("error : "+e);
        }
    }

    //alert(productVideo);
    return productVideo;

  }


  videoHandler(event){

      const file:File = event.target.files[0];

      
      const extension = file.type.split("/")[1];
      //alert(extension);
      //alert(["mp4", "mp3","avi"].indexOf(extension));
      if(["mp4", "mp3","avi"].indexOf(extension)>-1){

        this.productData_video.videoFile = file;
        //alert(this.productData_video.videoFile);

      }else{
        this.videoValid = 1;
        this.videoError = "Invalid video selected";
      }
  }


  removeLogo(logoId){
    this.logo_delete.push(logoId);
    this.productData_1.logo = null;
    this.logoRemoved =1;
  }

  undoLogo(){
    this.logo_delete.pop();
    this.productData_1.logoId = this.logoId;
    this.logoRemoved =0;
  }

  removeProductImage(){
    this.productImage_delete.push(this.productImageId);
    this.productData_1.productImage=null;
    this.productImageRemoved=1;
  }

  undoProductImage(){
    this.productImage_delete.pop();
    this.productData_1.productImage=this.productImageId;
    this.productImageRemoved=0;
  }

  removeColumn(category,index){
    this.popUpObject.open(ConstantsData.ARE_YOU_SURE, ConstantsData.DELETE_PRODUCT_SPEC, {
      "callback" : this.removeColumn_do,
      "params" : [category,index,this]});
  }

  removeColumn_do(category,index, __this){

      const categoryList =[
        "engine", "clutch", "suspension", "steering", "tyres"
      ];

      const categroy_name = categoryList[category];
      //alert(categroy_name);

      if(categroy_name!==undefined && __this.productData_specification[categroy_name].length <= __this.max_specs_columns ){

        __this.productData_specification[categroy_name].splice(index,1)
      
      }

  }

  removeFeature(index){


    this.popUpObject.open(ConstantsData.ARE_YOU_SURE, ConstantsData.DELETE_PRODUCT_FEATURE, {
      "callback" : this.removeFeature_do,
      "params" : [this, index]});
  }

  removeFeature_do(__this,index){
    __this.productData_feature.splice(index,1);
  }

  videoPreview(videoLink){
    if(videoLink){

    }
  }

  removeDoc(){
     this.productData_brochure.brochureFile = null;
     this.doc_remove.push(this.brochureId); 
     this.docRemoved =1;
  }

  undoDoc(){
    this.doc_remove.pop();
    this.docRemoved =0;
    this.productData_brochure.brochureFile = this.brochureId;
  }


  removeFeatureImage(index){
     
     this.productData_feature[index]["imagePath"] = null;
     this.feature_image_to_delete.push( this.productData_feature[index]["image"]);
     this.productData_feature[index]["image"] = null;
  }
    
  removeVideo(){

    this.productData_video.videoFile = null;
    this.video_delete.push(this.brochureId); 
    this.videoRemoved =1;

  }  


}


