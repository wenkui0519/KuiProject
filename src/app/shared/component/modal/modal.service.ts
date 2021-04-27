import { Injectable } from "@angular/core";
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class ModalService {
    constructor(
        private modal: NzModalService,
    ) { }
    private modalTemp;

    open(data): void {
        this.modalTemp = this.modal.create({
            nzTitle: data.title,
            nzContent: data.component,
            nzComponentParams: data.params,
            nzFooter: null,
        })
        this.modalTemp.afterClose.pipe(debounceTime(10)).subscribe(res => {
            if (res) {
                data.closed(res)
            }
        })
    }
    close() {
        this.modalTemp.destroy()
    }
    ok(data) {
        this.modalTemp.destroy(data)
    }
}