import { CommonModule } from '@angular/common';
import {
    AfterViewInit, Component, DoCheck, OnInit
} from '@angular/core';
import endOfDay from 'date-fns/endOfDay';
import endOfMonth from 'date-fns/endOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import subDays from 'date-fns/subDays';
declare var layui: any;
@Component({
    standalone: true,
    selector: 'eui-laydate',
    templateUrl: './laydate.component.html',
    styleUrls: ['./laydate.component.scss'],
    imports: [
        CommonModule,
    ],
})
export class EuiLayDateComponent implements OnInit, AfterViewInit,DoCheck {

    public demo4Data = '2018-10-31'
    public demo7Data = '10-31'
    constructor(
    ) { }
    ngOnInit() {
        const laydate = layui.laydate;
        // 渲染
        // 日期时间-有秒
        laydate.render({
            elem: '#ID-laydate-demo',
            lang: 'tw',
            type: 'datetime',
            autoConfirm: false,
        });
        // 日期时间-无秒
        laydate.render({
            elem: '#ID-laydate-demo1',
            lang: 'cn',
            type: 'datetime',
            autoConfirm: false,
            format: 'yyyy-MM-dd HH:mm',
        });
        // 日期时间-默认值
        laydate.render({
            elem: '#ID-laydate-demo2',
            lang: 'cn',
            type: 'datetime',
            autoConfirm: false,
            format: 'yyyy-MM-dd HH:mm',
            value: '2018-10-31 20:20',
        });
        // 日期时间-背景蒙层
        laydate.render({
            elem: '#ID-laydate-demo3',
            lang: 'cn',
            type: 'datetime',
            autoConfirm: false,
            format: 'yyyy-MM-dd HH:mm',
            shade: 0.01,
        });
        // 日期时间-时间和日期一起展示
        laydate.render({
            elem: '#ID-laydate-demo12',
            lang: 'cn',
            type: 'datetime',
            autoConfirm: false,
            format: 'yyyy-MM-dd HH:mm',
            fullPanel: true,
        });
        // 日期时间-范围
        laydate.render({
            elem: '#ID-laydate-demo11',
            lang: 'cn',
            type: 'datetime',
            autoConfirm: false,
            format: 'yyyy-MM-dd HH:mm',
            range: true,
            rangeLinked: true,
            shortcuts: [
                {
                    text: '本月',
                    value: () => {
                        const now = new Date();
                        const start = format(startOfMonth(now), 'yyyy-MM-dd HH:mm');
                        const end = format(endOfMonth(now), 'yyyy-MM-dd HH:mm');
                        return [start, end];
                    },
                },
                {
                    text: '本周',
                    value: () => {
                        const now = new Date();
                        const start = format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd HH:mm');
                        const end = format(endOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd HH:mm');
                        return [start, end];
                    },
                },
                {
                    text: '最近三天',
                    value: () => {
                        // 要分为"before" | "middle" | "after"
                        const now = new Date();
                        const start = format(startOfDay(subDays(now, 2)), 'yyyy-MM-dd HH:mm');
                        const end = format(endOfDay(now), 'yyyy-MM-dd HH:mm');
                        return [start, end];
                    },
                },
                {
                    text: '今天',
                    value: () => {
                        // 要分为"before" | "middle" | "after"
                        const now = new Date();
                        const start = format(startOfDay(now), 'yyyy-MM-dd HH:mm');
                        const end = format(endOfDay(now), 'yyyy-MM-dd HH:mm');
                        return [start, end];
                    },
                },
            ],
        });
        // 日期-显示格式
        laydate.render({
            elem: '#ID-laydate-demo4',
            lang: 'cn',
            type: 'date',
            format: 'yyyy-MM-dd',
            formatToDisplay: (value) => {
                const displayValue = format(value, 'yyyy.MM.dd');
                return displayValue;
            },
            isPreview: false,
            value: this.demo4Data,
            done: (value, date, endDate) => {
                this.demo4Data = value;
            },
            shade: 0.1,
        });
        // 日期-自动展开
        laydate.render({
            elem: '#ID-laydate-demo5',
            lang: 'cn',
            type: 'date',
            isPreview: false,
            show: true,
        });
        // 年月
        laydate.render({
            elem: '#ID-laydate-demo6',
            lang: 'cn',
            type: 'month',
            isPreview: false,
        });
        // 月日
        laydate.render({
            elem: '#ID-laydate-demo7',
            lang: 'cn',
            type: 'date',
            isPreview: false,
            theme: 'month-day primary',
            format: 'MM-dd',
            value: this.demo7Data,
            formatToDisplay: (value) => {
                const displayValue = format(value, 'MM-dd');
                return displayValue;
            },
            done: (value, date, endDate) => {
                this.demo7Data = value;
            },
        });
        // 时间-带秒
        laydate.render({
            elem: '#ID-laydate-demo8',
            lang: 'cn',
            type: 'time',
            format: 'HH:mm:ss',
            isPreview: false,
        });
        // 时间-不带秒
        laydate.render({
            elem: '#ID-laydate-demo9',
            lang: 'cn',
            type: 'time',
            format: 'HH:mm',
            isPreview: false,
        });
        // 时间范围-带秒
        laydate.render({
            elem: '#ID-laydate-demo10',
            lang: 'cn',
            type: 'time',
            format: 'HH:mm:ss',
            range: true,
            rangeLinked: true,
            isPreview: false,
        });
    }
    ngAfterViewInit(): void {
    }
    ngDoCheck(): void {
        console.log('ngDoCheck');
    }
}
