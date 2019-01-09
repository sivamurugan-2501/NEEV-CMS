import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-custom-popups',
  templateUrl: './custom-popups.component.html',
  styleUrls: ['./custom-popups.component.css']
})
export class CustomPopupsComponent implements OnInit {


  @Input() mainMessage = null;
  @Input() subMessage = null;
  //@Input() buttons = null;
  @Output() userResponse = new EventEmitter();
  @Input() userResponse1=-1;

  callbackFunction:Function;
  callbackFunctionParams:Array<Object>;

  constructor(config: NgbModalConfig, private modalService: NgbModal, public activeModal: NgbActiveModal  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  
  }

  ngOnInit() {
  }

  sendResponse(response){
   
    //this.userResponse1 = response;
    if(response){
      const params = this.callbackFunctionParams;
      this.callbackFunction(...params);
    }
    
    this.activeModal.close();
  }
}

@Component({
  selector: 'ngbd-modal-component',
  template: 'No template'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}
  modalRef;
  open(mainMessage:string, subMessage:string, funcs:any) {

    this.modalRef  = this.modalService.open(CustomPopupsComponent, { centered: true });
    this.modalRef.componentInstance.name = 'World';
    this.modalRef.componentInstance.mainMessage = mainMessage;
    this.modalRef.componentInstance.subMessage = subMessage;
    this.modalRef.componentInstance.callbackFunction = funcs.callback;
    this.modalRef.componentInstance.callbackFunctionParams = funcs.params;
  
  
    return this.modalRef;
    
  }

  getResponse(){

  }
  

}
