import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Injector, Input, OnInit } from '@angular/core';
import { FlowGramNodeComponent } from './flow-gram-node/flow-gram-node.component';
// import '../../../script/flow-gram/fixed-layout-webcomponent.min.js';
import '../../../script/flow-gram/action-flow-editor.min.js';
import { createCustomElement } from '@angular/elements';
import { FlowGramConfig, FlowNodeJSON } from './flow-gram.interface';
import { FlowGramService } from './flow-gram.service';

@Component({
    standalone: true,
    selector: 'kp-flow-gram',
    templateUrl: './flow-gram.component.html',
    styleUrls: ['./flow-gram.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        FlowGramNodeComponent,
    ]
})
export class EuiFlowGramComponent implements OnInit, AfterViewInit {
    // 组件配置
    @Input() config: FlowGramConfig;
    // 初始数据
    private _initialData: FlowNodeJSON[];
    @Input() set initialData(value: FlowNodeJSON[]) {
        this._initialData = value;
    }
    get initialData() {
        return this._initialData;
    }

    constructor(
        private injector: Injector,
        private changRef: ChangeDetectorRef,
        private flowGramService: FlowGramService,
    ) {
    }
    // 组件加载完成标志
    public isLoaded = false;

    ngOnInit() {
        if (!customElements.get('action-flow-node')) {
            const el = createCustomElement(FlowGramNodeComponent, { injector: this.injector });
            customElements.define('action-flow-node', el);
        }
        // 多语言处理
        this.config['langs'] = this.flowGramService.getLangs();
    }
    ngAfterViewInit(): void {
        this.isLoaded = true;
        this.changRef.detectChanges();
    }
}
