import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { DomSanitizer} from '@angular/platform-browser';

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


  @ViewChild('videoFrame') iframe; 

  dismissOption=true;

  constructor(config: NgbModalConfig, public activeModal: NgbActiveModal,  private spinner: NgxSpinnerService, private sanitizer: DomSanitizer) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  dismissModal(){
    this.activeModal.close();
  }

  showSpinner(){
    this.spinner.show();
  }

  safeURL(source){
    return this.sanitizer.bypassSecurityTrustResourceUrl(source);
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
      //this.modalRef.componentInstance.videoLink = source;
    }else if(contentType==3){
      // this.modalRef.componentInstance.showSpinner();
      this.modalRef.componentInstance.dismissOption = false;
    }


  
    return this.modalRef;
    
  }

  dismissModal(){
    this.modalRef.componentInstance.dismissModal();
    
  }
}
