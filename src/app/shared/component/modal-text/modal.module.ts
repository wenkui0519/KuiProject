import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    NgbModal
} from './modal';
export { NgbModal } from './modal';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
    entryComponents: [],
    exports: [],
    providers: [NgbModal]
})

export class ModalModule { }
