import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map, takeUntil } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, NgZone, OnDestroy,
    OnInit, Output
} from '@angular/core';
import {
    FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule
} from '@angular/forms';
import format from 'date-fns/format';
import { Observable, timer } from 'rxjs';

@Component({
    standalone: true,
    selector: 'eui-range',
    templateUrl: './range.component.html',
    styleUrls: ['./range.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EuiRangeComponent),
        multi: true
    }],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EuiRangeComponent implements OnInit, AfterViewInit {

    @Output() plainTextChange: EventEmitter<any>;
    constructor(
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef
    ) {
        this.plainTextChange = new EventEmitter();
    }
    public model = '';
    public disabled: boolean | undefined;

    onChange: (_: string | number | boolean) => void = () => null;
    onTouched: () => void = () => null;
    public test111 = 0;
    public currentTime;
    public currentTime$: Observable<Date>;

    ngOnInit() {
        // 简单定时器
        // setInterval(() => {
        //     this.test111++
        //         // 手动触发变更检测
        //         this.ngZone.run(() => {
        //             this.cdr.detectChanges();
        //         });
        // }, 100);
        // 优化后定时器
        // this.ngZone.runOutsideAngular(() => {
        //     setInterval(() => {
        //         this.test111++
        //         // 每1s次手动触发变更检测
        //         if (this.test111 % 10 === 0) {
        //             // 手动触发变更检测
        //             this.ngZone.run(() => {
        //                 this.cdr.detectChanges();
        //             });
        //         }
        //     }, 100);
        // });

        // setInterval(() => {
        //     this.currentTime = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        // }, 1000);

        // this.currentTime$ = timer(0, 1000).pipe(
        //     map(() => new Date()) // 转换为当前时间
        // );
    }
    ngAfterViewInit(): void {
    }
    registerOnChange(fn: (_: string | number | boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
    writeValue(data): void {
        this.model = data;
    }
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
        console.log(isDisabled);
    }

    changeValue() {
        this.onChange(this.model);
        this.plainTextChange.emit('123');
    }
}
