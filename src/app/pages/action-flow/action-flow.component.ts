import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ChangeOption, FlowGramConfig, FlowNodeJSON, NodeType } from 'src/app/shared/components/flow-gram/flow-gram.interface';

import { ActionFlowModel, ActionInfo, ActionItem, EventItem } from './utils/interface/action-flow.interface';
import { ActionType, EventType, ExceptionHandleType } from './utils/enum/action-flow.enum';
import { ActionFlowSettingService } from './utils/service/action-flow-setting.service';
import { IfNodeComponent } from './nodes/if/if-node.component';
import { IfBlockNodeComponent } from './nodes/if-block/if-block-node.component';
import { EndNodeComponent } from './nodes/end/end-node.component';
import { SwitchNodeComponent } from './nodes/switch/switch-node.component';
import { CaseDefaultNodeComponent } from './nodes/case-default/case-default-node.component';
import { LoopNodeComponent } from './nodes/loop/loop-node.component';
import { BreakLoopNodeComponent } from './nodes/break-loop/break-loop-node.component';
import { TryCatchNodeComponent } from './nodes/try-catch/try-catch-node.component';
import { StartNodeComponent } from './nodes/start/start-node.component';
import { DefaultNodeComponent } from './nodes/default/default-node.component';
import { EventSettingService } from './utils/service/event-setting.service';
import { ActionFlowOutSideService } from './action-flow.service';
import { angular } from 'src/app/core/angular-utils';
import { UtilService } from 'src/app/core/util.service';
import { EuiFlowGramComponent } from '@shared-component/components/flow-gram/flow-gram.component';

@Component({
    standalone: true,
    selector: 'kp-action-flow',
    templateUrl: './action-flow.component.html',
    styleUrls: ['./action-flow.component.scss'],
    providers: [ActionFlowSettingService, EventSettingService],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EuiFlowGramComponent,
        StartNodeComponent,
        DefaultNodeComponent,
        IfNodeComponent,
        IfBlockNodeComponent,
        EndNodeComponent,
        SwitchNodeComponent,
        CaseDefaultNodeComponent,
        LoopNodeComponent,
        BreakLoopNodeComponent,
        TryCatchNodeComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionFlowSettingComponent implements OnInit {
    // 动作流id
    @Input('flowId') flowId: string;

    @ViewChild('NodeTemplate', { static: true }) NodeTemplate: TemplateRef<void>;

    //默认值
    constructor(
        private utilService: UtilService,
        private destroyRef: DestroyRef,
        private changeRef: ChangeDetectorRef,
        private actionFlowSettingService: ActionFlowSettingService,
        @Optional() private actionFlowOutSideService: ActionFlowOutSideService,
    ) { }
    // 加载状态
    public loading: boolean = false;
    // 编辑状态
    public disabled: boolean = false;
    // 操作节点列表唯一标识
    private uidMap: Record<string, boolean> = {};
    // 动作流数据
    public flowModel: ActionFlowModel;
    // 动作流名称
    public flowName: string = '未定义';
    // public flowName: string = this.euiI18nService.i18nTrans('integrationCenter.action_flow.empty_name');
    // 动作流介绍
    public introduce = '';
    // 动作流分类
    public category = 1;
    // 动作流分类下拉框
    public actionFlowCategory = {
        source: 'api/action-flow/category/list',
        valueField: 'action_flow_category_id',
        labelField: 'action_flow_category_name',
        filter: true,
        // searchField: [],
        // emptyOption: '',
    };
    /**
     * 新版本配置
    */
    // 动作流组件配置
    public config: FlowGramConfig;
    // 参数上下文
    public paramsMap: Record<string, ActionInfo> = {};
    // 隐藏属性设置
    public showRightContent = false;

    ngOnInit() {
        // 动作流插件配置
        this.config = {
            nodeTemplate: () => this.NodeTemplate,
            beforeAdd: (addProps: FlowNodeJSON) => { return this.beforeAdd(addProps); },
            // 节点数据改变回调
            onchange: (nodes: FlowNodeJSON[] | any, opt: ChangeOption) => this.changeNode(nodes, opt),
        }
        // 非新建模式下，请求数据
        if (this.flowId) {
            this.getActionFlow(this.flowId);
        } else {
            const startUid = this.utilService.createRandomId(this.uidMap);
            this.uidMap[startUid] = true;
            const endUid = this.utilService.createRandomId(this.uidMap);
            this.uidMap[endUid] = true;
            // 新建时默认数据
            this.flowModel = {
                action_flow_name: '未定义',
                action_flow_category: 1,
                action_flow_introduce: '',
                nodes: [
                    {
                        id: 'start_0',
                        type: 'start',
                        data: {
                            title: '开始节点',
                            event_type: EventType.Flow,
                            node_id: startUid,
                            parent_id: 0,
                            data: {},
                        },
                    }, {
                        id: 'end_0',
                        type: 'end',
                        data: {
                            title: '结束节点',
                            node_id: endUid,
                            parent_id: 0,
                        },
                    }
                ],
            };
            // this.initData();
        }
        // 保存
        // this.actionFlowOutSideService.getHandler().pipe(
        //     takeUntilDestroyed(this.destroyRef)
        // ).subscribe((options: { callback: Function }) => {
        // 返回保存结果
        // this.save().subscribe(result => options.callback(result));
        // });
    }
    // 获取动作流数据
    private async getActionFlow(flowId) {

    }
    // 初始化默认数据
    private async initData() {
        // 操作节点
        let nodes: Array<FlowNodeJSON> = this.flowModel?.nodes || [];
        if (this.flowModel) {
            // 起始处理
            // const event = nodes[0].data as EventItem;
            // await this.actionFlowSettingService.initEventParam(event);
            this.flowName = this.flowModel.action_flow_name || '未定义';
            this.introduce = this.flowModel.action_flow_introduce || '';
            this.category = this.flowModel.action_flow_category || 1;
            this.disabled = !this.flowModel.can_edit;
            // 生成action_uid
            this.uidMap = {};
            // 开始节点、结束节点不处理
            for (let i = 1; i < nodes.length - 1; i++) {
                const action = nodes[i].data.data as ActionItem;
                if (!action.node_id) {
                    action.node_id = this.utilService.createRandomId(this.uidMap);
                }
                this.uidMap[action.node_id] = true;
                this.actionFlowSettingService.initActionParam(nodes[i]);
            }
        } else {
            this.flowName = '未定义';
            this.disabled = false;
            this.uidMap = {};
        }
        // 初始化节点参数列表
        this.paramsMap = await this.actionFlowSettingService.initParamMap(nodes);
        this.changeRef.markForCheck();
    }
    // 添加节点
    public beforeAdd(node: FlowNodeJSON) {
        // const deep = (node, parent_id) => {
        //     node.data = Object.assign({}, node.data, {
        //         node_id: this.utilService.createRandomId(this.uidMap),
        //         parent_id: parent_id || 0,
        //     });
        // }
        // 新增节点数据处理
        if (node.type === 'default') {
            node.data = Object.assign({}, node.data, {
                node_id: this.utilService.createRandomId(this.uidMap),
                parent_id: 0, // 默认节点的父节点为0，有父级的话会在addFromNode回调中处理
                action_type: ActionType.Connector,
                // exception_handle_type: ExceptionHandleType.Break,
                data: {},
            });
        } else {
            node.data = Object.assign({}, node.data, {
                node_id: this.utilService.createRandomId(this.uidMap),
                parent_id: 0, // 默认节点的父节点为0，有父级的话会在addFromNode回调中处理
            });
        }
        // 字节的uid
        if (node.blocks?.length) {
            node.blocks.forEach((childNode) => {
                childNode.data = Object.assign({}, childNode.data, {
                    node_id: this.utilService.createRandomId(this.uidMap),
                    parent_id: node.data.node_id || 0,
                });
            });
        }
        return node;
    }
    /**
     * @description 节点数据改变
     * @param nodes 节点列表
     * @param opt 修改节点参数
     */
    public async changeNode(nodes: FlowNodeJSON[], opt: ChangeOption) {
        // 详细信息
        const detail = opt.value;
        // 节点信息
        let nodeInfo = detail.data;
        let nodeType = nodeInfo?.type;
        let index;
        switch (opt.type) {
            // 添加节点
            case 'addFromNode': {
                if (nodeType === 'tryCatch') {
                    // angular.forEach
                }
                // 添加节点时，要处理节点参数
                // if (nodeType === 'default') {
                // 获取当前节点参数
                this.actionFlowSettingService.initActionParam(nodeInfo);
                // 获取当前添加节点的顶层节点在root下的index
                // 由于获取的是detail.fromId的下标，所以需要+1
                index = this.actionFlowSettingService.getParentNodeInfo(nodes, detail.fromId)?.parentNodeIndex + 1;
                // 在root下从指定index开始计算参数
                this.paramsMap = await this.actionFlowSettingService.initParamMap(nodes);
                // }

                // 节点组件init会快于当前回调方法，所以可以在这里处理
                // 添加节点时，设置parent_id
                const parentNode = this.actionFlowSettingService.getParentNodeInfo(nodes, nodeInfo.id)?.parentNode;
                if (parentNode) {
                    const callback = this.actionFlowSettingService.nodeCallBack[nodeInfo.data.node_id];
                    callback?.setValue('parent_id', parentNode.data.node_id);
                }
            }

                break;

            // 删除节点
            case 'deleteBlock': {// 删除节点时，要处理节点回调缓存
                delete this.actionFlowSettingService.nodeCallBack[nodeInfo.data.node_id]
                // 删除节点时，要处理节点参数
                if (nodeType === 'default') {
                    // const uid = nodeInfo.data.node_id;
                    // delete this.actionFlowSettingService.actionParam[uid];
                    // delete this.actionFlowSettingService.paramMap[uid];
                }
                if (detail.parentId === 'root') {
                    index = detail.index;
                } else {
                    // 获取当前删除节点的顶层节点在root下的index
                    index = this.actionFlowSettingService.getParentNodeInfo(nodes, nodeInfo.id)?.parentNodeIndex;
                }
                // 在root下从指定index开始计算参数
                this.paramsMap = await this.actionFlowSettingService.initParamMap(nodes);
                break;
            }

            // 添加块
            case 'addBlock': {

                break;
            }

            // 移动节点
            case 'moveChildNodes': {
                const { fromIndex, toIndex, fromParentId, toParentId, nodeIds } = detail;
                // 拖拽的节点blocks阶层没改变时
                if (fromParentId === toParentId && fromParentId !== 'root') {
                    // todo...这里做到不完善，如果只是某个节点的blocks中的顺序改变，那只需要计算当前父级节点下blocks中节点参数列表
                    // todo...目前直接从顶层父节点下标计算
                    // index = this.actionFlowSettingService.getParentNodeInfo(nodes, nodeInfo.id)?.parentNodeIndex;
                    this.paramsMap = await this.actionFlowSettingService.initParamMap(nodes);
                    break;
                } else {
                    // 获取最小的下标
                    // index = Math.min(toIndex, fromIndex);
                    // 在root下从指定index开始计算参数
                    this.paramsMap = await this.actionFlowSettingService.initParamMap(nodes);
                    // 拖拽节点们父级节点改变时
                    angular.forEach(nodeIds, id => {
                        // 节点阶层改变时，重置parent_id属性
                        const result = this.actionFlowSettingService.getParentNodeInfo(nodes, id);
                        const parentNode = result?.parentNode,
                            currentNode = result?.currentNode;
                        const callback = (currentNode ? this.actionFlowSettingService.nodeCallBack[currentNode.data.node_id] : null);
                        if (parentNode) {
                            callback?.setValue('parent_id', parentNode.data.node_id);
                        } else {
                            // 拖拽到root节点下时，修改parent_id为0
                            callback?.setValue('parent_id', 0);
                        }
                    });
                    break;
                }
            }

            // 修改节点属性
            case 'changeFormValues': {
                // 修改的属性为data时，说明要重新加载参数信息
                if (detail.path === 'data' || detail.path === 'data.data') {
                    nodeInfo = this.actionFlowSettingService.getNodeInfo(nodes, detail.id);
                    nodeType = nodeInfo?.type;
                    // 起始节点数据改变要重新加载参数信息
                    if (nodeType === 'start') {
                        await this.actionFlowSettingService.initEventParam(nodeInfo.data as EventItem);
                        index = 0;
                    }
                    // 操作节点数据改变要重新加载当前节点参数信息
                    if (nodeType === 'default') {
                        this.actionFlowSettingService.initActionParam(nodeInfo);
                        index = this.actionFlowSettingService.getParentNodeInfo(nodes, nodeInfo.id)?.parentNodeIndex;
                    }
                    // 获取当前修改节点的顶层节点在root下的index
                    // 在root下从指定index开始计算参数
                    this.paramsMap = await this.actionFlowSettingService.initParamMap(nodes);
                }
                break;
            }

            // 默认执行
            default:
                break;
        }
        // 存储数据
        this.flowModel.nodes = angular.copy(nodes);
        this.changeRef.markForCheck();
    }
    // 保存
    public save() {

    }

    // 右侧收起按钮
    public rightBtnClick() {
        this.showRightContent = !this.showRightContent;
    }
}
