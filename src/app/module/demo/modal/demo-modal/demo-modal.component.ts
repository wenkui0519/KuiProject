import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/component/modal/modal.service';

@Component({
    selector: 'app-demo-modal',
    templateUrl: './demo-modal.component.html',
    styleUrls: ['./demo-modal.component.scss']
})
export class DemoModalComponent implements OnInit {
    @Input() params;

    constructor(
        private modalService: ModalService,
    ) { }
    public text;

    ngOnInit() {
        if(this.params){
            this.text = this.params.text;
        }
    }
    close(){
        this.modalService.close();
    }
    ok(){
        this.modalService.ok('ok');
    }
}
