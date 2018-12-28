import { Component, OnInit, ElementRef, ViewChild, Input, Output } from '@angular/core';
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
  userResponse1="no set";

  constructor(config: NgbModalConfig, private modalService: NgbModal, public activeModal: NgbActiveModal  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  
  }

  ngOnInit() {
  }

  sendResponse(response){
    this.userResponse.emit(response);
    this.userResponse1 = "et";
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
  open(mainMessage:string, subMessage:string) {

    this.modalRef  = this.modalService.open(CustomPopupsComponent, { centered: true });
    this.modalRef.componentInstance.name = 'World';
    this.modalRef.componentInstance.mainMessage = mainMessage;
    this.modalRef.componentInstance.subMessage = subMessage;
    return this.modalRef;
  }

  getResponse(){

  }
  

}
