import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { NodeBaseDirective } from '../node-base';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'action-flow-case-default-node',
    standalone: true,
    templateUrl: './case-default-node.component.html',
    styleUrls: ['./case-default-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseDefaultNodeComponent extends NodeBaseDirective implements OnInit {

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    ngOnInit() {
    }
}
