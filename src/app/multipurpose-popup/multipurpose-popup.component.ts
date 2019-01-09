import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-multipurpose-popup',
  templateUrl: './multipurpose-popup.component.html',
  styleUrls: ['./multipurpose-popup.component.css']
})
export class MultipurposePopupComponent implements OnInit {

  // 1 - Image, 2- Loader, 3-Video
  contentType;
  imageSource;
  videoLink;

  dismissOption=true;

  constructor(config: NgbModalConfig, public activeModal: NgbActiveModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  dismissModal(){
    this.activeModal.close();
  }

}


@Component({
  selector: 'ngbd-modal-component2',
  template: 'No template'
})

export class NgbdModalComponent2 {
  constructor(private modalService: NgbModal) {}
  modalRef;
  open(contentType:number, source:string) {

    this.modalRef  = this.modalService.open(MultipurposePopupComponent, { centered: true });
    this.modalRef.componentInstance.contentType=contentType;
    if(contentType==1){
      this.modalRef.componentInstance.imageSource = source;
    }else if(contentType==2){
      this.modalRef.componentInstance.videoLink = source;
    }else if(contentType==3){
      this.modalRef.componentInstance.dismissOption = false;
    }


  
    return this.modalRef;
    
  }

  dismissModal(){
    this.modalRef.componentInstance.dismissModal();
  }
}
