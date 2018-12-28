import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-action-message',
  templateUrl: './action-message.component.html',
  styleUrls: ['./action-message.component.css']
})
export class ActionMessageComponent implements OnInit {

  @Input() type: number;
  @Input() message: String;
  hide=0;

  constructor() { }

  ngOnInit() {
    const __this = this; 
    setTimeout(function(){
      __this.hide =1;
     },2000);
  }

}
