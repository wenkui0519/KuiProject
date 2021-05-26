import { ComponentRef, Injectable, ViewRef } from "@angular/core";
import { NgbModalWindow } from "./modal-window"

export class ContentRef {
    /**
     * nodes 组件元素节点
     * viewRed 组件主视图
     * componentRef 组件实例对象
    */
    constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) { }
}

/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.close()` or `.dismiss()` the modal window from your component.
 */
@Injectable()
export class NgbActiveModal {
    constructor() { }

    close(result?: any): void {

    }

    dismiss(reason?: any): void {

    }
}

/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
export class NgbModalRef {
    constructor(private _windowCmptRef: ComponentRef<NgbModalWindow>,
        private _contentRef: ContentRef,) { }

}