import { ProductService } from "../services/product.service";

export class ProductEdit {

    productDetails:any;
    constructor(private productService: ProductService){

    }

    loadProductData(productId){
        //var data =false;
        this.productService.getProductById(productId).subscribe(
            (response:any) => {
                if(response.status == 200){
                    this.productDetails = response.products;
                    //alert(this.productDetails);
                    //return data;
                }
            }
        );
        //return data;
    }
}