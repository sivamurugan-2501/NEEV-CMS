import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-master-list',
  templateUrl: './product-master-list.component.html',
  styleUrls: ['./product-master-list.component.css']
})
export class ProductMasterListComponent implements OnInit {

  master = true;
  
  constructor() { }

  ngOnInit() {
  }

}
