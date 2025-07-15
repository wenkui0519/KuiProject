import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NodeBaseDirective } from '../node-base';

@Component({
    selector: 'action-flow-try-catch-node',
    standalone: true,
    templateUrl: './try-catch-node.component.html',
    styleUrls: ['./try-catch-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryCatchNodeComponent extends NodeBaseDirective implements OnInit {

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    ngOnInit() {
        super.ngOnInit();
        this.initButtons();
    }
}
