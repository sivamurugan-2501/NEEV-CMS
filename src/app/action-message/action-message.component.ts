import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-action-message',
  templateUrl: './action-message.component.html',
  styleUrls: ['./action-message.component.css']
})
export class ActionMessageComponent implements OnInit {

  @Input() type: number;
  @Input() message: String;

  constructor() { }

  ngOnInit() {
     
  }

}
