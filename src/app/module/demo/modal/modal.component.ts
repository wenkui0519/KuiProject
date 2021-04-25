import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/component/modal/modal.service';
import { DemoModalComponent } from './demo-modal/demo-modal.component'

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    constructor(
        private modalService: ModalService,
    ) { }

    ngOnInit() {
    }
    open() {
        const params = {
            title: 'demo modal',
            Component: DemoModalComponent,
            params: {
                text: 'hello world'
            },
            closed: (res) => {
                console.log(res)
            }
        }
        this.modalService.open(params);
    }

}
