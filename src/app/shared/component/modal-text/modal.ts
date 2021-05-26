import {
    Component, ComponentFactoryResolver, Injectable, Injector
} from '@angular/core';
// import { NgbModalConfig, NgbModalOptions } from './modal-config';
import { NgbModalStack } from './modal-stack';
import { NgbActiveModal, NgbModalRef } from './modal-ref';


@Injectable({
    providedIn: 'root'
})
export class NgbModal {
    constructor(
        private _moduleCFR: ComponentFactoryResolver,
        private _injector: Injector,
        private _modalStack: NgbModalStack,
    ) { }
    private commonOption = {
        container: null,
        injector: this._injector,
    }

    open(component, option?): NgbModalRef {
        const options = Object.assign({}, this.commonOption, option);
        return this._modalStack.open(component, options, this._moduleCFR, this._injector);
    }
}
