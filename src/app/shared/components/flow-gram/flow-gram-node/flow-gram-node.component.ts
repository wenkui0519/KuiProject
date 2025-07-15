import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FlowNodeOperation } from '../flow-gram.interface';
import { angular } from 'src/app/core/angular-utils';

@Component({
    standalone: true,
    selector: 'kp-flow-gram',
    templateUrl: './flow-gram-node.component.html',
    styleUrls: ['./flow-gram-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
    ]
})
export class FlowGramNodeComponent implements OnInit {
    // 配置
    @Input() config;
    // 节点数据
    @Input() nodeData;
    // 节点类型
    @Input() type;
    // 节点操作方法集合
    @Input() flowNodeOperation: FlowNodeOperation = {};

    constructor(
        private changeRef: ChangeDetectorRef,
    ) {
    }
    public nodeTemplate;
    // 组件加载完成标志
    public show = false;

    ngOnInit() {
    }
    ngOnChanges(changes: SimpleChanges) {
        // 配置获取
        if (changes.config && changes.config.isFirstChange) {
            const value = changes.config.currentValue;
            this.nodeTemplate = value?.nodeTemplate;
            this.show = angular.isDefined(value?.nodeTemplate);
            this.changeRef.markForCheck();
        }
    }
}
