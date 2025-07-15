import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { NodeBaseDirective } from '../node-base';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'action-flow-end-node',
    standalone: true,
    templateUrl: './end-node.component.html',
    styleUrls: ['./end-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndNodeComponent extends NodeBaseDirective implements OnInit {

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    // 执行类型
    public handleType: 'remind';
    // 提示文字
    public toolTips = 'eui.flow_graph.please_set_remind';
    ngOnInit() {
        super.ngOnInit();
        this.handleType = this.model.handle_type;
        if (this.handleType === 'remind' && this.model.data) {
            this.toolTips = 'common.has_set';
        }
    }
    // 改变执行方式
    public changeType(type: 'remind') {
        this.handleType = type;
        this.model.handle_type = type;
        this.setValue('handle_type', type);
        if (!type && this.model.data) {
            this.clear();
        }
    }
    public clear() {
        this.toolTips = 'eui.flow_graph.please_set_remind';
        this.model.data = '';
        this.setValue('data', '');
        this.changeRef.markForCheck();
    }
}
