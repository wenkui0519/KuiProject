import { Component, OnInit } from '@angular/core';
import { EuiModal } from 'src/app/shared/component/modal';

// import { ModalService } from 'src/app/shared/component/modal/modal.service';
import { DemoModalComponent } from './demo-modal/demo-modal.component'

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    constructor(
        // private modalService: ModalService,
        private modal:EuiModal
    ) { }

    ngOnInit() {
    }

    open() {
      const modalRef = this.modal.open(DemoModalComponent);

      // modalRef.result.then((result) => {
      //     this.closeResult = `Closed with: ${result}`;
      // }, () => {
      //     this.closeResult = `Modal has been dismissed`;
      // });
  }

}
