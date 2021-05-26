import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Inject, Input, OnDestroy,
    OnInit, Output, ViewEncapsulation, ViewChild, NgZone, ChangeDetectionStrategy
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';

// import { getFocusableBoundaryElements } from '../util/focus-trap';
// import { Key } from '../util/key';
// import { ModalDismissReasons } from './modal-dismiss-reasons';

@Component({
    selector: 'eui-modal-window',
    host: {
        '[class]': '"eui-modal fade show eui-d-block" + (windowClass ? " " + windowClass : "")',
        'role': 'dialog',
        'tabindex': '-1',
        '[attr.aria-modal]': 'true',
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-describedby]': 'ariaDescribedBy',
    },
    template: `
    <div #dialog [class]="'eui-modal-dialog' + (size ? ' eui-modal-' + size : '') + (centered ? ' eui-modal-dialog-centered' : '') +
     (scrollable ? ' eui-modal-dialog-scrollable' : '')" role="document">
        <div class="eui-modal-content"><ng-content></ng-content></div>
    </div>
    `,
    // upgrade by liuning 20190718
    encapsulation: ViewEncapsulation.None,
    // styleUrls: ['./modal.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush, // 调整组件更新策略 - wangjianxiong 20200604
})
export class NgbModalWindow implements OnInit,
    AfterViewInit, OnDestroy {
    private _closed$ = new Subject<void>();
    private _elWithFocus: Element | null = null;  // element that is focused prior to modal opening

    @ViewChild('dialog', { static: true }) private _dialogEl: ElementRef<HTMLElement>;

    @Input() ariaLabelledBy: string;
    @Input() ariaDescribedBy: string;
    @Input() backdrop: boolean | string = true;
    @Input() centered: string;
    @Input() keyboard = true;
    @Input() scrollable: string;
    @Input() size: string = 'sm';
    @Input() windowClass: string;
    @HostBinding('style.z-index') 
    @Input() zIndex: string;

    @Output('dismiss') dismissEvent = new EventEmitter();

    constructor(
        @Inject(DOCUMENT) private _document: any, 
        private _elRef: ElementRef<HTMLElement>, 
        private _zone: NgZone
        ) { }

    dismiss(reason): void { this.dismissEvent.emit(reason); }

    ngOnInit() { }

    ngAfterViewInit() {
        
    }

    ngOnDestroy() {
        
    }
}
