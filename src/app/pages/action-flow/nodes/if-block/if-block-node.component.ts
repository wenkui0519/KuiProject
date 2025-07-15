import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { NodeBaseDirective } from '../node-base';

@Component({
    selector: 'action-flow-if-block-node',
    standalone: true,
    templateUrl: './if-block-node.component.html',
    styleUrls: ['./if-block-node.component.scss'],
    imports: [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IfBlockNodeComponent extends NodeBaseDirective implements OnInit {

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    // if块\else块标识
    public isTrueBlock = true;
    ngOnInit() {
        if (this.model.isTrue === false || this.model.isTrue === 'false') {
            this.isTrueBlock = false;
        }
    }
}
