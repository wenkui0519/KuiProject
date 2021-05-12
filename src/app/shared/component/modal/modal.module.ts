// import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    NgbModal
} from './modal';
export { NgbModal } from './modal';

// import { NgbModalBackdrop } from './modal-backdrop';
// import { NgbModalWindow } from './modal-window';

// export { NgbModalConfig, NgbModalOptions } from './modal-config';
// export { ModalDismissReasons } from './modal-dismiss-reasons';
@NgModule({
    imports: [
        CommonModule,
        // DragDropModule, // 用于拖拽功能实现
    ],
    declarations: [],
    entryComponents: [],
    exports: [],
    providers: [NgbModal]
})

// upgrade by liuning 20190718
// export class NgbModalModule { }
export class ModalModule { }
// upgrade by liuning 20190718
