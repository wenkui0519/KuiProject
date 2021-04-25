import { Injectable } from "@angular/core";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
    providedIn: 'root'
})

export class ModalService {
    constructor(
        private modal: NzModalService,
        private modelRef: NzModalRef
    ) { }

    open(data): void {
        const modal = this.modal.create({
            nzTitle: data.title,
            nzContent: data.component,
            nzComponentParams: data.params,
        });
        modal.afterClose.subscribe(res => {
            if (res) {
                data.closed(res)
            }
        })
    }
    close() {
        this.modelRef.destroy()
    }
    ok(data) {
        this.modelRef.destroy({ data: data })
    }
}