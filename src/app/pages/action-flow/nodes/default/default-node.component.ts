import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    OnInit,
    Optional,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventSettingService } from '../../utils/service/event-setting.service';
import { NodeBaseDirective } from '../node-base';


@Component({
    standalone: true,
    selector: 'action-flow-default-node',
    templateUrl: './default-node.component.html',
    styleUrls: ['./default-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultNodeComponent extends NodeBaseDirective implements OnInit {
    constructor(
        injector: Injector,
        @Optional() private eventSettingService: EventSettingService,
    ) {
        super(injector);
    }
    public status: 'close' | 'open' | 'setting' = 'close';
    public sourceConfig = this.eventSettingService.getActionConfig();
    // 操作类型
    public actionType: string;

    ngOnInit() {
        super.ngOnInit();
        this.initButtons();
        this.actionType = this.model?.action_type || '';
    }
    // 修改参数来源类型
    public setType(item) {
        if (this.model.action_type == item.key || this.disabled) {
            return;
        }
        this.model.action_type = item.key;
        this.actionType = item.key;
        // 切换操作类型时，重置数据
        this.model.data = {};
        // 修改节点数据
        this.setValue('action_type', item.key);
        this.changeRef.markForCheck();
    }
    // 参数来源改变
    public changeValue(data) {
        this.model.data = data;
        this.setValue('data', data);
        this.changeRef.markForCheck();
    }

}
