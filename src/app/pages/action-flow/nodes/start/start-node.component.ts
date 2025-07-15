import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    OnInit,
    Optional,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventType } from '../../utils/enum/action-flow.enum';
import { EventSettingService } from '../../utils/service/event-setting.service';
import { NodeBaseDirective } from '../node-base';


@Component({
    standalone: true,
    selector: 'action-flow-start-node',
    templateUrl: './start-node.component.html',
    styleUrls: ['./start-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartNodeComponent extends NodeBaseDirective implements OnInit {
    constructor(
        injector: Injector,
        @Optional() private eventSettingService: EventSettingService,
    ) {
        super(injector);
    }
    // 状态
    public status: 'close' | 'open' | 'setting' = 'close';
    public sourceConfig = this.eventSettingService.getEventConfig();
    // 发起节点类型
    public eventType: EventType = EventType.Flow;

    ngOnInit() {
        super.ngOnInit();
        if (!this.model) {
            this.model = {
                title: '开始节点',
                event_type: EventType.Flow,
                data: {},
            }
        }
        this.eventType = this.model.event_type || EventType.Flow;
    }
    // 修改参数来源类型
    public setType(item) {
        if (this.model.event_type == item.key || this.disabled) {
            return;
        }
        this.model.event_type = item.key;
        this.eventType = item.key;
        if (item.key === EventType.Flow) {
            this.model.data = { flow_id: '', form_id: '' };
        } else if (item.key === EventType.Custom) {
            this.model.data = {
                table_list: [{
                    is_main: 1,
                    table_id: 'main',
                    table_name: '主表',
                    param_list: [],
                }],
            };
        }
        this.setValue('event_type', item.key);
        this.setValue('data', this.model.data);
        this.changeRef.markForCheck();
    }
    // 参数来源改变
    public changeValue(data) {
        this.model.data = data;
        this.setValue('data', this.model.data);
        this.changeRef.markForCheck();
    }

}
