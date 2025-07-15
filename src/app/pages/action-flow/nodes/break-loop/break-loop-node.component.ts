import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { NodeBaseDirective } from '../node-base';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'action-flow-break-loop-node',
    standalone: true,
    templateUrl: './break-loop-node.component.html',
    styleUrls: ['./break-loop-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreakLoopNodeComponent extends NodeBaseDirective implements OnInit {

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
