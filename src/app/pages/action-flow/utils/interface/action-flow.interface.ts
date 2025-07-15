import { NodeType } from "src/app/shared/components/flow-gram/flow-gram.interface";
import { ActionType, EventType, ExceptionHandleType } from "../enum/action-flow.enum";

// 老版本配置
export interface OldActionFlowModel {
    event: EventItem,
    actions: ActionItem[];
    // 动作流名称
    action_flow_name: string;
    // 动作流分类
    action_flow_category: number;
    // 动作流详细介绍
    action_flow_introduce: string;
    // 编辑状态
    can_edit: boolean;
    // 删除状态
    can_delete: boolean;
}
/**------------动作流ngModel配置-------------**/
// 新版本配置
export interface ActionFlowModel {
    action_flow_name: string; // 动作流名称
    action_flow_introduce: string; // 动作流介绍
    action_flow_category: number; // 动作流分类
    nodes: Array<NodeItem>;
    can_edit?: boolean; // 编辑状态
    can_delete?: boolean; // 删除状态
}
// 节点块
export interface NodeItem {
    id: string; // 插件内部生成的节点id
    type: NodeType; // 节点类型
    data: EventItem | ActionItem | SystemNode | EndNode; // 节点数据
    blocks?: Array<NodeItem>// 子节点块
}

/**------------首节点-------------**/
// 事件项配置
export interface EventItem {
    // 事件名称
    title: string;
    // 事件类型
    event_type: EventType;
    // 事件参数
    data?: CustomEventData | FlowEventData | any;
    [key: string]: any;
}
// 自定义事件
export interface CustomEventData {
    table_list: CustomEventTableItem[];
}
// 自定义事件参数表
export interface CustomEventTableItem {
    is_main: number; // 是否为主表
    table_id: string | string; // 表id
    table_name: string; // 表名称
    param_list: CustomEventParamItem[]; // 参数列表
}
// 自定义事件参数项
export interface CustomEventParamItem {
    action_flow_id?: number;
    param_id?: number;
    param_index?: number;
    [key: string]: any;
}
// 流程事件参数
export interface FlowEventData {
    flow_id: string;
    form_id: string;
}


/**------------操作节点-------------**/
// 操作节点配置
export interface ActionItem {
    action_id?: string | number; // 操作节点id
    node_id: string | number; // 操作节点内置id
    parent_id?: string | number; // 父节点id
    title: string; // 操作节点名称
    action_type: ActionType; // 操作类型
    // exception_handle_type?: ExceptionHandleType; // 异常处理类型
    // exception_message?: string | null; // 异常处理信息
    data?: ConnectorAction | SystemAction | SqlAction | FileAction | any; // 操作参数
    [key: string]: any;
}
// 连接器节点配置
export interface ConnectorAction {
    connector_id?: string;
}
// 系统数据节点配置
export interface SystemAction {
    menu: string,
    module: string,
    field: string,
    analysis_method: 'text' | 'id',
    parent: string | Object | Array<any>,
}
// sql节点配置
export interface SqlAction {
    database_id: number,
    fieldType: string,
    table_name: string,
    id_field: string,
    field: string,
    fields: string,
    searchItems: Array<any>,
    sort_field: string,
    sort_method: string,
    originalValue: string,
}
// 来自文件节点配置
export interface FileAction {
    filePath: string,
    parent: string | Object | Array<any>,
}


/**------------标准节点-------------**/
export interface SystemNode {
    node_id?: string | number; // 操作节点内置id
    parent_id?: string | number; // 父节点id
    title?: string; // 操作节点名称
    formula?: string; // 公式
    handle_type?: 'unique' | 'parallel'; // switch节点执行方式
    loop_type?: 'number' | 'condition'; // 循环节点执行方式
    loop_number?: number; // 循环次数
    loop_formula?: string; // 循环规则
    [key: string]: any;
}
/**------------结束节点-------------**/
export interface EndNode {
    node_id?: string | number; // 操作节点内置id
    parent_id?: string | number; // 父节点id
    title?: string; // 操作节点名称
    handle_type?: 'remind'; // 结束节点执行方式
    [key: string]: any;
}

/**------------动作流中流转参数配置-------------**/
// 动作节点上下文
export interface ActionInfo {
    id: string | number,
    title: string,
    category?: any, // 用于计算公式分类
    list: Array<SettingParam>, // 节点可选字段信息
}
// 设置时，事件、动作所需要的参数列表配置
export interface SettingParam extends Control {
    id,
    title,
}
// 控件属性
export interface Control {
    readonly control_id: string;
    readonly control_title: string;
    readonly control_type: string;
    readonly control_attribute: any;
    readonly control_parent_id: string;
}
