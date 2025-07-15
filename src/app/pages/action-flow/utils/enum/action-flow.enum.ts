// 事件类型
export enum EventType {
    Custom = 'custom',
    Flow = 'flow',
    Empty = 'empty',
}

// 操作类型
export enum ActionType {
    // 连接器
    Connector = 'connector',
    // 系统数据
    SystemData = 'systemData',
    // sql
    Sql = 'sql',
    // file
    File = 'file',
    // empty
    Empty = 'empty',
}
// 异常处理类型
export enum ExceptionHandleType {
    // 终止
    Break = 'break',
    // 跳过
    Skip = 'skip',
}
