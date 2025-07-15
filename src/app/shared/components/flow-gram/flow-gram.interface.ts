import { TemplateRef } from "@angular/core";

export interface FlowGramConfig {
    // 显示背景
    background?: boolean,
    // 只读
    readonly?: boolean,
    // 默认布局方式
    defaultLayout?: 'vertical-fixed-layout' | 'horizontal-fixed-layout',
    // 样式配置
    constants?: ConstantKeys,
    // 节点模板
    nodeTemplate?: () => TemplateRef<any>,
    // 组件初始化回调
    onInit?: (ext: any) => void,
    // 节点数据改变回调
    onchange?: (data: FlowNodeJSON[] | any, opt: ChangeOption) => void,
    // 画布销毁回调
    onDispose?: () => void,
    /**
     * 节点添加回调
     * @param addProps 添加节点参数 
     * @returns 添加节点数据
     * */
    beforeAdd?: (addProps: FlowNodeJSON) => FlowNodeJSON,
    // 多语言
    langs?: { [key: string]: string },
}
// 画布节点修改参数
export interface ChangeOption {
    type: 'addFromNode' | 'addBlock' | 'moveChildNodes' | 'deleteBlock' | 'changeFormValues',
    value: {
        // 节点信息{id,type,data,blocks},公共属性
        data: FlowNodeJSON,
        // addFromNode
        fromId: string,
        // addBlock
        targetId: string, //添加到哪个节点的blocks中
        index: number, //添加到第几个位置
        // deleteBlock:index\parentId
        parentId: 'root' | string, // 删除的节点的父节点id
        // moveChildNodes
        nodeIds: string[], // 移动的节点id
        fromIndex: number, // 移动前index。跨blocks时，是在root下的index
        toIndex: number, // 移动后index。跨blocks时，是在root下的index
        fromParentId: 'root' | string, // 移动前父节点id
        toParentId: 'root' | string, // 移动后父节点id
        // changeFormValues
        id: string, // 修改的节点id
        oldValue: any, // 修改前的值
        value: any, // 修改后的值
        path: string, // 修改参数路径,'.'连接的路径
    }
}

// 节点数据配置
export interface FlowNodeJSON {
    id: string,
    type: NodeType,
    data: {
        [key: string]: any,
    },
    blocks?: FlowNodeJSON[]
}

// 节点类型配置
export type NodeType = 'start' | 'end' | 'switch' | 'case' | 'caseDefault' | 'tryCatch' | 'catchBlock' | 'if' | 'ifBlock' | 'loop' | 'breakLoop' | 'default' | any;

// 节点操作方法集合
export interface FlowNodeOperation {
    // 设置节点数据
    'setValue'?: (name, value: any) => void,
    // 获取节点数据
    'getValue'?: (name) => void,
    // 删除节点
    'deleteNode'?: (event) => void,
    // 删除状态
    'deleteDisabled'?: () => boolean,
}

// 样式配置
interface ConstantKeys {
    /**
     * loop 底部留白
     */
    INLINE_SPACING_BOTTOM: string;
    /**
     * inlineBlocks 的 inlineTop
     * loop 循环线条上边距
     */
    INLINE_BLOCKS_INLINE_SPACING_TOP: string;
    /**
     * inlineBlocks 的 inlineBottom
     * loop 循环线条的下边距
     *
     */
    INLINE_BLOCKS_INLINE_SPACING_BOTTOM: string;
    /***
     * 线条、label 默认颜色
     */
    BASE_COLOR: string;
    /***
     * 线条、label 激活后的颜色
     */
    BASE_ACTIVATED_COLOR: string;
    /**
     * Branch bottom margin
     * 分支下边距
     */
    INLINE_BLOCKS_PADDING_TOP: string;
    NODE_SPACING: string;
    ROUNDED_LINE_X_RADIUS: string;
    ROUNDED_LINE_Y_RADIUS: string;
    INLINE_BLOCKS_PADDING_BOTTOM: string;
    COLLAPSED_SPACING: string;
    HOVER_AREA_WIDTH: string;
}