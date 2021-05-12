import {
    Component, ComponentFactoryResolver, EventEmitter, Injectable, Injector, Optional, Output, Input, ChangeDetectionStrategy
} from '@angular/core';
import { NgbModalConfig, NgbModalOptions } from './modal-config';
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
        private _config: NgbModalConfig
    ) { }
    /**
     * 思路梳理 
     * 1、modal.ts中是由外部调用，传入参数content:模板<string、template、component>，option
     * 2、用到的几个参数。1）、ComponentFactoryResolver：一个简单的注册表，它将 Components 映射到生成的 ComponentFactory 类，该类可用于创建组件的实例。2）、Injector，当前父类的injector实例，用于到之后创建工厂时候需要父级injector对象时候调用。
     * 3、调用后，走到modal-stack.ts，生成弹窗类中。
     **/ 
    open(content: any, options: NgbModalOptions = {}): NgbModalRef {
        const combinedOptions = Object.assign({}, this._config, options);
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    }

}
