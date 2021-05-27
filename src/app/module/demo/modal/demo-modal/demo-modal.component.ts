import { Component, Input, OnInit } from '@angular/core';
import { EuiActiveModal } from 'src/app/shared/component/modal-text';


@Component({
    selector: 'app-demo-modal',
    templateUrl: './demo-modal.component.html',
    styleUrls: ['./demo-modal.component.scss']
})
export class DemoModalComponent implements OnInit {
    @Input() params;

    constructor(
        private activeModal: EuiActiveModal,
    ) { }
    public text = '123';

    ngOnInit() {
        if(this.params){
            this.text = this.params.text;
        }
    }
    // close(){
    //     this.modalService.close();
    // }
    ok(){
        this.activeModal.close('ok');
    }
}
