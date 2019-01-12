import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare function fixSize():any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  
  constructor(private aroute : ActivatedRoute) { }

  ngOnInit() {
    this.aroute.url.subscribe(
      (u)=>{
          setTimeout(
            () => {
              fixSize();
            }
          );
       });
  }
}
