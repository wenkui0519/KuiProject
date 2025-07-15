import { ChangeDetectorRef, Directive, Injector, Input, OnInit, Optional } from "@angular/core";
import { ActionFlowSettingService } from "../utils/service/action-flow-setting.service";
import { FlowNodeOperation } from "src/app/shared/components/flow-gram/flow-gram.interface";

@Directive({})

export class NodeBaseDirective implements OnInit {
    // @Input() model: any;
    private _model;
    @Input() set model(value) {
        this._model = value;
    }
    get model() {
        return this._model;
    }
    @Input() disabled: boolean;
    // 节点操作方法集合
    @Input() flowNodeOperation: FlowNodeOperation = {};
    // 当前动作节点上下文相关信息
    @Input() actionInfo: any;

    public changeRef: ChangeDetectorRef;
    public actionFlowSettingService: ActionFlowSettingService;
    constructor(
        injector: Injector,
    ) {
        this.changeRef = injector.get(ChangeDetectorRef);
        this.actionFlowSettingService = injector.get(ActionFlowSettingService);
    }

    // 节点名称编辑状态标志
    public nodeNameEdit = false;

    // // 按钮配置
    // private buttonConfig = {
    //     delete: {
    //         title: 'common.delete', // 删除
    //         color: 'red',
    //     },
    //     exception: {
    //         title: '异常处理', // 删除
    //         color: 'red',
    //     },
    // };

    ngOnInit(): void {
        // 记录节点操作方法
        this.actionFlowSettingService.nodeCallBack[this.model.node_id] = this.flowNodeOperation;
    }

    // 操作按钮
    public buttons: Array<{
        key: string;
        title: string;
        color?: string;
        disabled?: boolean;
    }> = [];

    // 设置节点数据
    public setValue(key, value) {
        if (this.flowNodeOperation['setValue']) {
            this.flowNodeOperation.setValue(key, value);
        }
    }
    // 删除节点
    public deleteNode(event) {
        if (this.flowNodeOperation['deleteNode']) {
            this.flowNodeOperation.deleteNode(event);
        }
    }
    // 节点删除状态
    public deleteDisabled() {
        if (this.flowNodeOperation['deleteDisabled']) {
            return this.flowNodeOperation.deleteDisabled();
        }
        return true;
    }
    // 初始化按钮
    protected initButtons() {
        this.buttons = [{
            key: 'delete',
            title: 'common.delete', // 删除
            disabled: this.deleteDisabled(),
        }];

    }
    // 执行按钮动作
    protected invokeAction(actionKey: string) {
        switch (actionKey) {
            // 删除
            case 'delete':
                this.deleteNode(null);
                break;

            default:
                break;
        }
    }

    // 编辑节点名称
    public editName() {
        this.nodeNameEdit = true;
        this.changeRef.markForCheck();
    }
    // 保存节点名称
    public saveName() {
        this.nodeNameEdit = false;
        // 存储节点title
        this.setValue('title', this.model.title);
        this.changeRef.markForCheck();
    }

}