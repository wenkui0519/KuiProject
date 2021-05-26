import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, NgZone,
    RendererFactory2, TemplateRef
} from '@angular/core';
import { NgbActiveModal, ContentRef, NgbModalRef } from './modal-ref';
import { NgbModalWindow } from './modal-window';


@Injectable({
    providedIn: 'root'
})

export class NgbModalStack {
    constructor(
        private _applicationRef: ApplicationRef,
        private _injector: Injector,
    ) {

    }
    /**
     * @param content 传进来的component对象、TemplateRef、string
     * @param moduleCFR 示例工厂，疑问为什么父级传进来
     * @param contentInjector 父级注入器
     * */
    open(content, options, moduleCFR: ComponentFactoryResolver, contentInjector: Injector,): NgbModalRef {
        // 拿到要插入对象的实体
        const containerEle = options.container instanceof HTMLElement ? options.container : (options.container ? document.querySelector(options.container) : document.body);

        // activeModal中有空的close、dismiss方法，目的是为了后续，再重新定义close、dismiss方法做准备。主要概念：类的思想，组件工厂创建组件的时候，给组件实例变为activemodal类，方便后续增加功能的时候，可以去NgbActiveModal类中定义特殊方法。
        const activeModal = new NgbActiveModal();
        // 创建component实例对象
        const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);
        const windowRef = this._attachWindowComponent(moduleCFR, containerEle, contentRef);

        const ngbModalRef: NgbModalRef = new NgbModalRef(windowRef, contentRef);

        return ngbModalRef;
    }

    // 创建component实例对象
    _getContentRef(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, activeModal: NgbActiveModal, options): ContentRef {
        if (!content) {

        } else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal)
        }

    }
    _createFromComponent(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, activeModal: NgbActiveModal): ContentRef {
        // 实例化组件工厂
        const componentFactory = moduleCFR.resolveComponentFactory(content)
        // 创建注入器
        const modalInjector = Injector.create({ providers: [{ provide: NgbActiveModal, useValue: activeModal }], parent: contentInjector });
        // 创建组件
        const modalRef = componentFactory.create(modalInjector);
        // 拿到当前组件实体元素
        const componentNativeEl = modalRef.location.nativeElement;
        // 对当前组件的视图hostView,进行心脏检测(标记脏值)
        this._applicationRef.attachView(modalRef.hostView)
        // 返回一个ContentRef对象,ContentRef类主要是对返回的对象数据包装一下.这里componentNativeEl包两层数组是为了window实例创建的时候使用的。组件工厂creat所需。
        return new ContentRef([[componentNativeEl]], modalRef.hostView, modalRef);
    }

    _attachWindowComponent(moduleCFR: ComponentFactoryResolver, containerEle: any, contentRef: any): ComponentRef<NgbModalWindow> {
        const windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        const windowCpnRef = windowFactory.create(this._injector, contentRef.nodes)
        containerEle.appendChild(windowCpnRef.location.nativeElement);
        return windowCpnRef;
    }
}