import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-uplaods',
  templateUrl: './user-uplaods.component.html',
  styleUrls: ['./user-uplaods.component.css']
})
export class UserUplaodsComponent implements OnInit {

  actionStatus=0;
  userUploadData;
  successMessage;
  errorMessage;

  constructor() { }

  ngOnInit() {
  }

}
