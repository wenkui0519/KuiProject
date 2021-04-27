import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/component/modal/modal.service';

@Component({
    selector: 'app-demo-modal',
    templateUrl: './demo-modal.component.html',
    styleUrls: ['./demo-modal.component.scss']
})
export class DemoModalComponent implements OnInit {
    @Input() text;

    constructor(
        private modalService: ModalService,
    ) { }

    ngOnInit() {
    }
    
    ok(){
        const data = 'ok'
        this.modalService.ok(data);
    }
}
