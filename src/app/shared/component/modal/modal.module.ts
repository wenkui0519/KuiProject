import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { ModalService } from './modal.service';

@NgModule({
    imports: [
        CommonModule,
        NzModalModule
    ],
    declarations: [ModalComponent],
    exports: [
        ModalComponent,
    ],
    providers:[
        ModalService,
    ]
})
export class ModalModule { }
