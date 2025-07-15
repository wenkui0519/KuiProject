import { Injectable } from '@angular/core';
import { ActionType, EventType } from '../enum/action-flow.enum';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventSettingService {
    constructor(
    ) { }
    // 连接器列表
    public connectList: any[];
    // 获取事件类型
    getEventConfig() {
        return [{
            key: EventType.Flow,
            title: '流程', // 流程
            icon: 'icon-file-flow',
        }, {
            key: EventType.Custom,
            title: '自定义', // 自定义
            icon: 'icon-custom-selector',
        }];
    }
    // 获取事件类型
    getActionConfig() {
        return [
            {
                key: ActionType.Connector,
                title: '连接器', // 流程
                icon: 'icon-connector',
            },
            {
                key: ActionType.SystemData,
                title: '系统数据',
                icon: 'icon-connector',
            },
            {
                key: ActionType.Sql,
                title: 'SQL语句',
                icon: 'icon-connector',
            },
            {
                key: ActionType.File,
                title: '来自文件',
                icon: 'icon-connector',
            },
        ];
    }
}
