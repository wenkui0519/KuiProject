import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NodeBaseDirective } from '../node-base';

@Component({
    selector: 'action-flow-switch-node',
    standalone: true,
    templateUrl: './switch-node.component.html',
    styleUrls: ['./switch-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchNodeComponent extends NodeBaseDirective implements OnInit {

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    // 执行类型
    public handleType: 'unique' | 'parallel' = 'unique';
    ngOnInit() {
        super.ngOnInit();
        this.initButtons();
        this.handleType = this.model.handle_type || 'unique';
    }
    // 改变执行方式
    public changeType(type: 'unique' | 'parallel') {
        this.handleType = type;
        this.model.handle_type = type;
        this.setValue('handle_type', type);
    }
}
