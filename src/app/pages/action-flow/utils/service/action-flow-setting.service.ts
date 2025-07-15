import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActionInfo, ActionItem, EventItem, NodeItem, SettingParam } from '../interface/action-flow.interface';
import { ActionType, EventType } from '../enum/action-flow.enum';
import { FlowNodeJSON, FlowNodeOperation, NodeType } from '@shared-component/components/flow-gram/flow-gram.interface';
import { angular } from 'src/app/core/angular-utils';

@Injectable()
export class ActionFlowSettingService {
    constructor(
    ) { }
    // 事件参数列表
    public eventParam: SettingParam[] = [];
    // 动作参数列表
    public actionParam: Record<string, ActionInfo> = {};
    // 节点上下文参数列表
    private paramMap: Record<string, ActionInfo> = {};
    // 节点回调函数记录
    public nodeCallBack: Record<string, FlowNodeOperation> = {};

    // 初始化节点上下文参数列表
    public async initParamMap(nodes: Array<FlowNodeJSON>, index = 0) {
        let initialParams: SettingParam[] = [];
        const initialCategory = { 'init_params': { title: '初始化参数' } };

        if (index === 0) {
            this.paramMap = {};
            if (!this.eventParam?.length) {
                await this.initEventParam(nodes[0].data as EventItem);
            }
            initialParams = [...this.eventParam];
        }
        // Helper: 合并多个参数列表，去重（根据id）
        const mergeParams = (baseArray: SettingParam[], pushArrays: SettingParam[][]) => {
            angular.forEach(pushArrays, (branch: SettingParam[]) => {
                angular.forEach(branch, (param: SettingParam) => {
                    if (!baseArray.find((item, index) => { return item.control_id === param.control_id; })) {
                        baseArray.push(param);
                    }
                });
            });
        };

        // helper: 合并多个分类对象（后面的覆盖前面的）
        const mergeCategory = (baseCat, cats: any[]): any => Object.assign(baseCat, ...cats);

        /**
         * 递归遍历
         * @param nodes 当前层节点列表
         * @param incomingParams 从上游继承来的参数
         * @param incomingCategory 从上游继承来的分类
         * @returns 本层及子层执行完毕后的参数供下一个同级节点使用
         */
        const traverse = (
            nodes: FlowNodeJSON[],
            incomingParams: SettingParam[],
            incomingCategory: any
        ): SettingParam[] => {
            // 同一层中需要修改原数组、原对象
            let currentParams = incomingParams;
            let currentCategory = incomingCategory;

            for (const node of nodes) {
                const nodeType = node.type as NodeType;
                const uid = node.data?.node_id || node.id;
                const title = node.data?.title || uid;

                // 如果是参数产出节点，追加其输出参数和分类
                if (nodeType === 'start' || nodeType === 'default') {
                    const info = this.actionParam[uid];
                    if (info) {
                        // 同一阶层流的节点要修改原数值
                        currentParams.push(...info.list)
                        mergeCategory(currentCategory, [info.category || {}]);
                    }
                }

                // 存入 paramMap
                this.paramMap[uid] = {
                    id: uid,
                    title,
                    category: angular.copy(currentCategory),
                    list: currentParams.slice(),
                };

                // 更新当前参数/分类，并供给下一个阶层节点使用。如switch下case分支的节点
                const visibleParams = currentParams.slice(),
                    visibleCategory = angular.copy(currentCategory);

                // 处理流程控制结构
                if (nodeType === 'switch') {
                    // 每个 case/caseDefault 都继承同一 incoming
                    const branchResults: SettingParam[][] = [];
                    const branchCategories: any[] = [];

                    for (const caseItem of node.blocks || []) {
                        // case 节点本身也要写 paramMap 继承 current
                        const caseUid = caseItem.data.node_id || caseItem.id;
                        this.paramMap[caseUid] = {
                            id: caseUid,
                            title: caseItem.data.title || caseUid,
                            category: angular.copy(currentCategory),
                            list: currentParams.slice(),
                        };
                        // 遍历 case 子节点
                        const endParams = traverse(caseItem.blocks || [], [...visibleParams], visibleCategory);
                        branchResults.push(endParams);
                        // 每个分支末尾的分类如果需要也可收集
                        branchCategories.push(visibleCategory);
                    }
                    // 并集参数 & 并集分类
                    mergeParams(currentParams, branchResults);
                    mergeCategory(currentCategory, branchCategories);

                } else if (nodeType === 'tryCatch') {
                    // tryBlock：非 catchBlock 子节点
                    const tryBlocks = node.blocks?.filter(b => b.type !== 'catchBlock') || [];
                    const tryParams = traverse(tryBlocks, [...visibleParams], visibleCategory);

                    // catchBlocks
                    const catchResults: SettingParam[][] = [];
                    const catchCategories: any[] = [];
                    for (const tryBlock of node.blocks || []) {
                        // if (tryBlock.type === 'catchBlock') {
                        // tryBlock的data是undefined
                        const cbUid = tryBlock.data?.node_id;
                        if (cbUid) {
                            this.paramMap[cbUid] = {
                                id: cbUid,
                                title: tryBlock.data.title || cbUid,
                                category: { ...currentCategory },
                                list: currentParams.slice(),
                            };
                        }
                        const endParams = traverse(tryBlock.blocks || [], [...tryParams], visibleCategory);
                        catchResults.push(endParams);
                        catchCategories.push(visibleCategory);
                        // }
                    }
                    // 并集参数 & 并集分类
                    mergeParams(currentParams, [tryParams, ...catchResults]);
                    mergeCategory(currentCategory, [visibleCategory, ...catchCategories]);

                } else if (nodeType === 'if') {
                    const branchResults: SettingParam[][] = [];
                    const branchCategories: any[] = [];
                    // 循环true、false分支
                    for (const ifItem of node.blocks || []) {
                        // 遍历 ifBlock 子节点
                        const endParams = traverse(ifItem.blocks || [], [...visibleParams], visibleCategory);
                        branchResults.push(endParams);
                        branchCategories.push(visibleCategory);
                    }
                    // 并集参数 & 并集分类
                    mergeParams(currentParams, branchResults);
                    mergeCategory(currentCategory, branchCategories);
                } else if (nodeType === 'loop') {
                    // 遍历 loopBlock 子节点
                    const endParams = traverse(node.blocks || [], [...visibleParams], visibleCategory);
                    // 并集参数 & 并集分类
                    mergeParams(currentParams, [endParams]);
                    mergeCategory(currentCategory, [visibleCategory]);
                    // loop节点能选到当前节点blocks中节点的输出参数
                    this.paramMap[uid]['category'] = angular.copy(currentCategory);
                    this.paramMap[uid]['list'] = currentParams.slice();
                } else if (nodeType === 'end') {
                    // 遇到end节点时，当前分支不返回内容。因为当前分支结束了，后续的节点无法获取到当前分支的返回结果
                    return [];
                }
                // 其它类型（caseDefault, breakLoop, catchBlock, ifBlock）已在其父逻辑中存储
            }

            return currentParams;
        };

        // 从起始索引开始遍历所有节点
        traverse(nodes.slice(index), initialParams, initialCategory);
        // 返回最终的参数集合
        return this.paramMap;
    }

    // public async initParamMap(nodes: Array<FlowNodeJSON>, index = 0): Promise<void> {
    //     if (index === 0) {
    //         this.paramMap = {};
    //     }
    //     // 上一节点参数列表
    //     let preParam;
    //     // 记录节点上下文分类
    //     let preType = {
    //         'init_params': { title: '初始化参数' }
    //     };
    //     for (let i = index; i < nodes.length; i++) {
    //         // 发起节点
    //         if (i === 0) {
    //             await this.initEventParam(nodes[i].data as EventItem);
    //             preParam = [...this.eventParam];
    //         } else {
    //             // 指定下标时，首次拿上一节点参数是拿不到的，要从头获取一遍，后续的节点就不用重复获取了
    //             if (!preParam) {
    //                 preParam = [...this.eventParam];
    //                 const array = nodes.slice(1, index);
    //                 array.forEach(item => {
    //                     const id = item.data.node_id;
    //                     // 获取上一节点参数
    //                     preParam = [...preParam, ...this.actionParam[id].list];
    //                     // 获取上一节点分类
    //                     preType = Object.assign({}, preType, this.actionParam[id].category);
    //                 });
    //             }
    //             const actionData = nodes[i].data,
    //                 uid = actionData.node_id,
    //                 title = actionData.title;
    //             // 存储信息
    //             this.paramMap[uid] = {
    //                 id: uid,
    //                 title,
    //                 category: Object.assign({}, preType),
    //                 list: [...preParam],
    //             };
    //         }
    //     }


    //     // // 指定下标时，要获取
    //     // if (index !== 0 && actions[index - 1].node_id) {
    //     //     const preActionId = actions[index - 1].node_id;
    //     //     preParam = angular.copy(this.paramMap[preActionId].list) || [];
    //     //     // 记录当前节点上下文分类，用于计算公式分类
    //     //     preCategory = angular.copy(this.paramMap[preActionId].category);
    //     // } else {
    //     //     preParam = this.eventParam;
    //     //     preCategory = {
    //     //         'init_params': '初始化参数'
    //     //     };
    //     // }
    //     // 从下标处理上下文
    //     // for (let i = 0; i < actions.length; i++) {
    //     //     const action = actions[i],
    //     //         id = action.node_id,
    //     //         title = action.title;
    //     //     // 节点上下文参数列表
    //     //     this.paramMap[id] = {
    //     //         id,
    //     //         title: action.title,
    //     //         category: Object.assign({}, preType),
    //     //         list: [...preParam],
    //     //     };
    //     //     // 记录当前节点上下文
    //     //     if (this.actionParam[id]) {
    //     //         preParam = [...preParam, ...this.actionParam[id].list];
    //     //     }
    //     //     // 记录当前节点上下文分类，用于计算公式分类
    //     //     preType[`action_params,${id}`] = { title };
    //     // }
    // }
    // 获取节点上下文参数列表
    public getParamList(actionId) {
        return this.paramMap[actionId];
    }
    // 获取事件参数
    public async initEventParam(event: EventItem) {
        const eventParam = [];
        switch (event.event_type) {
            case EventType.Custom:
                if (event.data.table_list.length > 0) {
                    angular.forEach(event.data.table_list, table => {
                        if (table.is_main == 1) {
                            angular.forEach(table.param_list, item => {
                                const param = {
                                    control_id: item.param_unique_id,
                                    control_title: item.param_name,
                                    control_type: 'init_params',
                                    category: 'init_params',
                                };
                                eventParam.push(param);
                            });
                        } else {
                            // 明细表的内容用明细的操作方式实现
                            const children = [];
                            angular.forEach(table.param_list, item => {
                                children.push({
                                    control_id: item.param_unique_id,
                                    control_title: item.param_name,
                                });
                            });
                            eventParam.push({
                                control_id: table.table_id,
                                control_title: table.table_name,
                                control_type: 'init_params',
                                category: 'init_params',
                                is_detail: true,
                                children: children,
                            });
                        }
                    })
                }
                break;
            case EventType.Flow:
                // const res = await this.actionFlowService.getFormControls(event.data.form_id);
                // if (res.data) {
                //     angular.forEach(res.data, item => {
                //         eventParam.push(item);
                //     })
                // }
                break;
        }
        this.eventParam = eventParam;
    }
    // 获取节点参数
    public initActionParam(node: NodeItem) {
        const action = node.data as ActionItem
        const actionParam = [],
            category = {
                [node.data.node_id]: { title: node.data.title, }
            };
        switch (action.action_type) {
            case ActionType.Connector:
                const connectorParam = action.data || {};
                // 连接器接口详情
                const interfaceInfo = connectorParam.interface_info || {},
                    // 接口响应参数列表
                    responseBody = interfaceInfo.response_body || [],
                    // 已选参数列表
                    applyResponseField = connectorParam.apply_response_field || [];
                // 参数处理
                if (applyResponseField.length) {
                    angular.forEach(applyResponseField, key => {
                        const param = responseBody.find(item => item.param_unique_id === key);
                        if (param) {
                            actionParam.push({
                                control_id: param.interface_param_id,
                                control_title: param.param_name,
                                // todo...
                                // control_type: `action_params,${action.node_id}`,
                                control_type: action.node_id,
                                category: action.node_id,
                            });
                        }
                    });
                }
                break;
            case ActionType.SystemData:
            case ActionType.Sql:
            case ActionType.File:
                // 生成唯一id
                // const id = this.utilService.createRandomId(uidMap);
                // uidMap[id] = true;
                // 添加参数
                actionParam.push({
                    control_id: action.node_id,
                    control_title: action.title + '-response',
                    control_type: action.node_id,
                    category: action.node_id,
                });
                break;
            default:
                break;
        }
        this.actionParam[action.node_id] = {
            id: action.node_id,
            title: action.title,
            list: actionParam,
            category,
        };
    }

    /**
     * 获取节点所在顶层父级节点index等信息
     * @param nodes 节点列表
     * @param nodeId 节点id
     * @param pIndex 父级节点index
     * @param pNode 父级节点
     * @returns {parentNode, parentNodeIndex}
    */
    public getParentNodeInfo(nodes: FlowNodeJSON[], nodeId, pIndex?, pNode?) {
        let parentNode, parentNodeIndex, currentNode;
        try {
            angular.forEach(nodes, (node, index) => {
                if (node.id === nodeId) {
                    currentNode = node;
                    parentNode = pNode;
                    parentNodeIndex = angular.isDefined(pIndex) ? pIndex : index;
                    throw new Error('break');
                } else if (node.blocks?.length) {
                    const res = this.getParentNodeInfo(node.blocks, nodeId, index, node);
                    if (res?.parentNode) {
                        currentNode = res.currentNode;
                        parentNode = res.parentNode;
                        parentNodeIndex = res.parentNodeIndex;
                        throw new Error('break');
                    }
                }
            });
        } catch (error) {
            return {
                currentNode,
                parentNode,
                parentNodeIndex,
            }
        }
        return null;
    }
    /**
     * 获取节点信息
     * @param nodes 节点列表
     * @param nodeId 节点id
     * @returns 节点信息
    */
    public getNodeInfo(nodes: FlowNodeJSON[], nodeId: string): FlowNodeJSON {
        let result = null;
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.id === nodeId) {
                result = node;
                return result;
            } else if (node.blocks?.length) {
                result = this.getNodeInfo(node.blocks, nodeId);
                if (result) {
                    return result;
                }
            }
        }
        return;
    }
}
