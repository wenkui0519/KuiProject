import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormulaModalComponent } from './formula-modal/formula-modal.component';
import { ActionInfo } from '../../utils/interface/action-flow.interface';


@Component({
    selector: 'action-flow-formula',
    standalone: true,
    templateUrl: './formula.component.html',
    styleUrls: ['./formula.component.scss'],
    imports: [
        CommonModule,
        FormulaModalComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() formula: string;
    @Input() actionInfo: ActionInfo;
    @Output() change = new EventEmitter<string>();
    constructor(
        // private euiModal: EuiModal,
        private changeRef: ChangeDetectorRef,
    ) {
    }
    // 提示文字
    public toolTips = '请设置规则';

    ngOnInit() {
        if (this.formula) {
            this.toolTips = '已设置';
        }

    }

    public clear() {
        this.toolTips = '请设置规则';
        this.formula = '';
        this.change.emit(this.formula);
        this.changeRef.markForCheck();
    }

    public openModal() {
        // const modalRef = this.euiModal.open(FormulaModalComponent, { size: 'lg' });
        // modalRef.componentInstance.formula = this.formula;
        // modalRef.componentInstance.controls = angular.copy(this.actionInfo.list) || [];
        // modalRef.componentInstance.category = this.actionInfo.category || {};

        // modalRef.result.then(
        //     (formula) => {
        //         this.formula = formula;
        //         this.change.emit(this.formula);
        //         if (this.formula) {
        //             this.toolTips = '已设置';
        //         } else {
        //             this.toolTips = 'eui.flow_graph.please_set_formula';
        //         }
        //         this.changeRef.markForCheck();
        //     },
        //     () => { }
        // );
    }
}
