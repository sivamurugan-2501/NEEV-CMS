import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-import',
  templateUrl: './user-import.component.html',
  styleUrls: ['./user-import.component.css']
})
export class UserImportComponent implements OnInit {

  userImport = {
    file:null
  }
  constructor() { }

  ngOnInit() {
  }

  importUser(){
    
  }

}
