import { Subject } from 'rxjs';
// import { angular } from '../util/angular-utils';
import { angular } from '../../../core/angular-utils';

import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, NgZone,
    RendererFactory2, TemplateRef
} from '@angular/core';
import { NgbActiveModal, NgbModalRef } from './modal-ref';
import { NgbModalConfig, NgbModalOptions } from './modal-config';
import { ContentRef } from '../util/popup';
import { NgbModalWindow } from './modal-window';


@Injectable({ providedIn: 'root' })
export class NgbModalStack {

    constructor(
        private _applicationRef: ApplicationRef, private _injector: Injector, @Inject(DOCUMENT) private _document: any,
        private _rendererFactory: RendererFactory2,
        private _ngZone: NgZone,
    ) { };
    private _activeWindowCmptHasChanged = new Subject();
    // private _ariaHiddenValues: Map<Element, string> = new Map();
    private _backdropAttributes = ['backdropClass', 'zIndex'];
    private _modalRefs: NgbModalRef[] = [];
    private _windowAttributes =
        ['ariaLabelledBy', 'ariaDescribedBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size', 'windowClass', 'zIndex'];
    private _windowCmpts: ComponentRef<NgbModalWindow>[] = [];
    // zIndex动态获取
    zIndex;
    // 外部调用当前的open方法，开始创建、并且打开modal弹窗，同时给弹窗对象以及window包裹成赋予close、dismiss方法，然后把弹窗实例对象返回给modal.ts。这样，调用modal.ts方法就可拿到当前弹窗的实例对象。
    open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options): NgbModalRef {
        // containerEl要插入弹窗的实体
        const containerEl = options.container instanceof HTMLElement ? options.container : angular.isDefined(options.container) ?
            this._document.querySelector(options.container) :
            this._document.body;
        // 生成渲染器。渲染器的作用是：默认情况下，Angular 会把模板渲染成 DOM。 你可以使用自定义渲染器来拦截渲染类调用，或用于渲染一些非 DOM 的东西
        // 使用 RendererFactory2 创建你的自定义渲染器。使用自定义渲染器可以绕过 Angular 的模板机制，并进行无法以声明式语法表达的自定义 UI 变更。 比如，如果你要设置无法静态得知名称的 Property 或 Attribute，可以使用 setProperty() 或 setAttribute() 方法。
        const renderer = this._rendererFactory.createRenderer(null, null);

        // const revertPaddingForScrollBar = this._scrollBar.compensate();
        // 关闭弹窗方法，用于下方，弹窗操作结束后的then方法调用
        const removeBodyClass = () => {
            if (!this._modalRefs.length) {
                renderer.removeClass(this._document.body, 'modal-open');
                renderer.removeClass(this._document.body, 'eui-modal-open');
                // this._revertAriaHidden();
            }
        };

        if (!containerEl) {
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        // 实例化一个NgbActiveModal对象，带有空的close，dismiss方法。NgbActiveModal对象中空的方法是为了解决ts，未定义不弄调用问题，所以这里先定义一个空的，然后再替换掉（这里还是有疑惑）
        const activeModal = new NgbActiveModal();
        // 得到创建好的内容组件，拿到的是ContentRef实例对象
        const contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);

        // let backdropCmptRef: ComponentRef<NgbModalBackdrop> | undefined =
        //   options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : undefined;
        // 把创建好的内容组件，插入到一个wiindow包裹层中，拿到的是ContentRef实例对象
        let windowCmptRef: ComponentRef<NgbModalWindow> = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        // 将两个实例对象，赋予close、dismiss等方法，个人认为是拿到NgbModalRef里面去包装一下，在实例化出来
        // let ngbModalRef: NgbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        let ngbModalRef: NgbModalRef = new NgbModalRef(windowCmptRef, contentRef);

        // this._registerModalRef(ngbModalRef);
        // this._registerWindowCmpt(windowCmptRef);
        // ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
        // ngbModalRef.result.then(removeBodyClass, removeBodyClass);
        // activeModal.close = (result: any) => { ngbModalRef.close(result); };
        // activeModal.dismiss = (reason: any) => { ngbModalRef.dismiss(reason); };

        // 给弹窗实例赋值
        this._applyWindowOptions(windowCmptRef.instance, options);
        if (this._modalRefs.length === 1) {
            renderer.addClass(this._document.body, 'eui-modal-open');
        }

        // if (backdropCmptRef && backdropCmptRef.instance) {
        //   this._applyBackdropOptions(backdropCmptRef.instance, options);
        // }
        return ngbModalRef;
    }

    // 创建弹窗window容器
    private _attachWindowComponent(moduleCFR: ComponentFactoryResolver, containerEl: any, contentRef: any):
        ComponentRef<NgbModalWindow> {
        const windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
        const windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }

    // 将配置中涉及到window容器的属性传递给modal-window
    private _applyWindowOptions(windowInstance: NgbModalWindow, options: Object): void {
        this._windowAttributes.forEach((optionName: string) => {
            if (angular.isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }

            // 配置zIndex
            if (optionName === 'zIndex') {
                windowInstance[optionName] = this.zIndex;
            }

        });
    }

    // private _revertAriaHidden() {
    //   this._ariaHiddenValues.forEach((value, element) => {
    //     if (value) {
    //       element.setAttribute('aria-hidden', value);
    //     } else {
    //       element.removeAttribute('aria-hidden');
    //     }
    //   });
    //   this._ariaHiddenValues.clear();
    // }

    // 判断当前传进来的component是属于Component对象，还是Template对象。疑问。返回ContentRef对象有什么用，ContentRef并没有对传入数据做任何处理
    private _getContentRef(
        moduleCFR: ComponentFactoryResolver,
        contentInjector: Injector,
        content: any,
        activeModal: NgbActiveModal,
        options: NgbModalOptions): ContentRef {
        if (!content) {
            return new ContentRef([]);
        } else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        } else if (angular.isString(content)) {
            return this._createFromString(content);
        } else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal, options);
        }
    }

    // template对象的时候创建模板方式。
    private _createFromTemplateRef(content: TemplateRef<any>, activeModal: NgbActiveModal): ContentRef {
        const context = {
            $implicit: activeModal,
            close(result) { activeModal.close(result); },
            dismiss(reason) { activeModal.dismiss(reason); }
        };
        // TemplateRef.createEmbeddedView创建一个视图对象，并把它附着到父视图的视图容器上。context，这个新视图的上下文环境，继承自所附着的元素
        const viewRef = content.createEmbeddedView(context);
        // ApplicationRef对页面上运行的 Angular 应用程序的引用。attachView附加视图，以便对其进行脏检查。视图销毁后将自动分离。
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }

    // 字符串的时候创建模板方式
    private _createFromString(content: string): ContentRef {
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }

    // Component对象的时候创建模板方式
    private _createFromComponent(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, context: NgbActiveModal, options: NgbModalOptions): ContentRef {
        // esolveComponentFactory() 实例化组件的工厂。
        const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        // 创建注入器实例，需要父注入器实例
        const modalContentInjector =
            Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
        // ComponentFactory工厂，通过creat方法创建一个新组件，参数是注入器实例
        const componentRef = contentCmptFactory.create(modalContentInjector);
        // location当前组件的宿主元素
        const componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            (componentNativeEl as HTMLElement).classList.add('component-host-scrollable');
        }
        // componentRef.hostView当前组件的宿主视图
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }

    private _registerModalRef(ngbModalRef: NgbModalRef) {
        const unregisterModalRef = () => {
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
            }
        };
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }

    // private _registerWindowCmpt(ngbWindowCmpt: ComponentRef<NgbModalWindow>) {
    //   this._windowCmpts.push(ngbWindowCmpt);
    //   this._activeWindowCmptHasChanged.next();

    //   ngbWindowCmpt.onDestroy(() => {
    //     const index = this._windowCmpts.indexOf(ngbWindowCmpt);
    //     if (index > -1) {
    //       this._windowCmpts.splice(index, 1);
    //       this._activeWindowCmptHasChanged.next();
    //     }
    //   });
    // }
}
