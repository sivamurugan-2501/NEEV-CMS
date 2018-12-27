import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-popups',
  templateUrl: './custom-popups.component.html',
  styleUrls: ['./custom-popups.component.css']
})
export class CustomPopupsComponent implements OnInit {

  @ViewChild('content') content : ElementRef;
  constructor(config: NgbModalConfig, private modalService: NgbModal, public activeModal: NgbActiveModal  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
  }

  

}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './custom-popups.component.html',
  styleUrls: ['./custom-popups.component.css']
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CustomPopupsComponent);
    modalRef.componentInstance.name = 'World';
  }
}
