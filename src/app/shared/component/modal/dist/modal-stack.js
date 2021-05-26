"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.NgbModalStack = void 0;
var rxjs_1 = require("rxjs");
// import { angular } from '../util/angular-utils';
var angular_utils_1 = require("../../../core/angular-utils");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var modal_ref_1 = require("./modal-ref");
var popup_1 = require("../util/popup");
var modal_window_1 = require("./modal-window");
var NgbModalStack = /** @class */ (function () {
    function NgbModalStack(_applicationRef, _injector, _document, _rendererFactory, _ngZone) {
        this._applicationRef = _applicationRef;
        this._injector = _injector;
        this._document = _document;
        this._rendererFactory = _rendererFactory;
        this._ngZone = _ngZone;
        this._activeWindowCmptHasChanged = new rxjs_1.Subject();
        // private _ariaHiddenValues: Map<Element, string> = new Map();
        this._backdropAttributes = ['backdropClass', 'zIndex'];
        this._modalRefs = [];
        this._windowAttributes = ['ariaLabelledBy', 'ariaDescribedBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size', 'windowClass', 'zIndex'];
        this._windowCmpts = [];
    }
    ;
    // 外部调用当前的open方法，开始创建、并且打开modal弹窗，同时给弹窗对象以及window包裹成赋予close、dismiss方法，然后把弹窗实例对象返回给modal.ts。这样，调用modal.ts方法就可拿到当前弹窗的实例对象。
    NgbModalStack.prototype.open = function (moduleCFR, contentInjector, content, options) {
        var _this = this;
        // containerEl要插入弹窗的实体
        var containerEl = options.container instanceof HTMLElement ? options.container : angular_utils_1.angular.isDefined(options.container) ?
            this._document.querySelector(options.container) :
            this._document.body;
        // 生成渲染器。渲染器的作用是：默认情况下，Angular 会把模板渲染成 DOM。 你可以使用自定义渲染器来拦截渲染类调用，或用于渲染一些非 DOM 的东西
        // 使用 RendererFactory2 创建你的自定义渲染器。使用自定义渲染器可以绕过 Angular 的模板机制，并进行无法以声明式语法表达的自定义 UI 变更。 比如，如果你要设置无法静态得知名称的 Property 或 Attribute，可以使用 setProperty() 或 setAttribute() 方法。
        var renderer = this._rendererFactory.createRenderer(null, null);
        // const revertPaddingForScrollBar = this._scrollBar.compensate();
        // 关闭弹窗方法，用于下方，弹窗操作结束后的then方法调用
        var removeBodyClass = function () {
            if (!_this._modalRefs.length) {
                renderer.removeClass(_this._document.body, 'modal-open');
                renderer.removeClass(_this._document.body, 'eui-modal-open');
                // this._revertAriaHidden();
            }
        };
        if (!containerEl) {
            throw new Error("The specified modal container \"" + (options.container || 'body') + "\" was not found in the DOM.");
        }
        // 实例化一个NgbActiveModal对象，带有空的close，dismiss方法。NgbActiveModal对象中空的方法是为了解决ts，未定义不弄调用问题，所以这里先定义一个空的，然后再替换掉（这里还是有疑惑）
        var activeModal = new modal_ref_1.NgbActiveModal();
        // 得到创建好的内容组件，拿到的是ContentRef实例对象
        var contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);
        // let backdropCmptRef: ComponentRef<NgbModalBackdrop> | undefined =
        //   options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : undefined;
        // 把创建好的内容组件，插入到一个wiindow包裹层中，拿到的是ContentRef实例对象
        var windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
        // 将两个实例对象，赋予close、dismiss等方法，个人认为是拿到NgbModalRef里面去包装一下，在实例化出来
        // let ngbModalRef: NgbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        var ngbModalRef = new modal_ref_1.NgbModalRef(windowCmptRef, contentRef);
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
    };
    // 创建弹窗window容器
    NgbModalStack.prototype._attachWindowComponent = function (moduleCFR, containerEl, contentRef) {
        var windowFactory = moduleCFR.resolveComponentFactory(modal_window_1.NgbModalWindow);
        var windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    };
    // 将配置中涉及到window容器的属性传递给modal-window
    NgbModalStack.prototype._applyWindowOptions = function (windowInstance, options) {
        var _this = this;
        this._windowAttributes.forEach(function (optionName) {
            if (angular_utils_1.angular.isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
            // 配置zIndex
            if (optionName === 'zIndex') {
                windowInstance[optionName] = _this.zIndex;
            }
        });
    };
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
    // 判断当前传进来的component是属于Component对象，还是Template对象。
    // 疑问。返回ContentRef对象有什么用，ContentRef并没有对传入数据做任何处理。这里相当于是一个累的思想，返回的数据都是一个类，即使内部没有对数据进行任何的操作，却也依旧通过特殊的类去包装一层。所以这样操作。1、类的思想。2、为了后续可能增加新的定义留一个接口。
    NgbModalStack.prototype._getContentRef = function (moduleCFR, contentInjector, content, activeModal, options) {
        if (!content) {
            return new popup_1.ContentRef([]);
        }
        else if (content instanceof core_1.TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (angular_utils_1.angular.isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(moduleCFR, contentInjector, content, activeModal, options);
        }
    };
    // template对象的时候创建模板方式。
    NgbModalStack.prototype._createFromTemplateRef = function (content, activeModal) {
        var context = {
            $implicit: activeModal,
            close: function (result) { activeModal.close(result); },
            dismiss: function (reason) { activeModal.dismiss(reason); }
        };
        // TemplateRef.createEmbeddedView创建一个视图对象，并把它附着到父视图的视图容器上。context，这个新视图的上下文环境，继承自所附着的元素
        var viewRef = content.createEmbeddedView(context);
        // ApplicationRef对页面上运行的 Angular 应用程序的引用。attachView附加视图，以便对其进行脏检查。视图销毁后将自动分离。
        this._applicationRef.attachView(viewRef);
        return new popup_1.ContentRef([viewRef.rootNodes], viewRef);
    };
    // 字符串的时候创建模板方式
    NgbModalStack.prototype._createFromString = function (content) {
        var component = this._document.createTextNode("" + content);
        return new popup_1.ContentRef([[component]]);
    };
    // Component对象的时候创建模板方式
    NgbModalStack.prototype._createFromComponent = function (moduleCFR, contentInjector, content, context, options) {
        // esolveComponentFactory() 实例化组件的工厂。
        var contentCmptFactory = moduleCFR.resolveComponentFactory(content);
        // 创建注入器实例，需要父注入器实例
        var modalContentInjector = core_1.Injector.create({ providers: [{ provide: modal_ref_1.NgbActiveModal, useValue: context }], parent: contentInjector });
        // ComponentFactory工厂，通过creat方法创建一个新组件，参数是注入器实例
        var componentRef = contentCmptFactory.create(modalContentInjector);
        // location当前组件的宿主元素
        var componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            componentNativeEl.classList.add('component-host-scrollable');
        }
        // componentRef.hostView当前组件的宿主视图
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        console.log(new popup_1.ContentRef([[componentNativeEl]], componentRef.hostView, componentRef));
        return new popup_1.ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    };
    NgbModalStack.prototype._registerModalRef = function (ngbModalRef) {
        var _this = this;
        var unregisterModalRef = function () {
            var index = _this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                _this._modalRefs.splice(index, 1);
            }
        };
        this._modalRefs.push(ngbModalRef);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    };
    NgbModalStack = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __param(2, core_1.Inject(common_1.DOCUMENT))
    ], NgbModalStack);
    return NgbModalStack;
}());
exports.NgbModalStack = NgbModalStack;
