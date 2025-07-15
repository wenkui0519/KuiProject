import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';


@Component({
    standalone: true,
    templateUrl: './formula-modal.component.html',
    styleUrls: ['./formula-modal.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaModalComponent implements OnInit {

    @Input() disabled: boolean;
    @Input() formula: string;
    @Input() controls;
    @Input() category;

    constructor(
        private changeRef: ChangeDetectorRef,
    ) {
    }

    public formulaConfig;

    ngOnInit() {
        this.formulaConfig = {
            allowChangeType: true,
            type: Object.assign({}, this.category),
        };
    }

    // 确定
    public confirm() {
    }
    // 取消
    public cancel() {
    }
}
