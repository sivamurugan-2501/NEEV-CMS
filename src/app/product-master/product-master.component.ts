import { Component, OnInit } from '@angular/core';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ConfigsDataService } from '../services/configs-data.service';
import { ProductService } from '../services/product.service';
import { ConstantsData } from '../constants-data';
import { StorageService } from '../services/storage.service';
import {  Router, ActivatedRoute } from '@angular/router';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomPopupsComponent, NgbdModalComponent } from '../custom-popups/custom-popups.component';

import { NgbdModalComponent2 } from '../multipurpose-popup/multipurpose-popup.component';


import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent extends ProductAddComponent implements OnInit  {


  master = true;

  constructor( route : Router,  aRoute: ActivatedRoute ,  configService: ConfigsDataService,  productService: ProductService,  storageService: StorageService,  modalService: NgbModal,  videoService: VideoService) {
    super(route, aRoute, configService, productService, storageService, modalService, videoService   );
   }

  ngOnInit() {
  }

}
