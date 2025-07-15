import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { FormulaComponent } from '../../shared/formula/formula.component';
import { NodeBaseDirective } from '../node-base';

@Component({
    selector: 'action-flow-loop-node',
    standalone: true,
    templateUrl: './loop-node.component.html',
    styleUrls: ['./loop-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        FormulaComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoopNodeComponent extends NodeBaseDirective implements OnInit {

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    // 循环类型
    public loopType: 'number' | 'condition' = 'number';
    // 循环次数
    public loopNumber: number = 1;
    // 循环规则
    public loopFormula: string
    ngOnInit() {
        super.ngOnInit();
        this.initButtons();
        this.loopType = this.model.loop_type || 'number';
        this.loopNumber = this.model.loop_number || 1;
        this.loopFormula = this.model.loop_formula;
    }
    // 改变执行方式
    public changeType(type: 'number' | 'condition') {
        this.loopType = type;
        this.model.loop_type = type;
        this.setValue('loop_type', type);
    }
    // 循环次数
    public changeNumber(number: number) {
        this.loopNumber = number;
        this.model.loop_number = number;
        this.setValue('loop_number', number);
    }
    // 循环规则
    public changeFormula(formula: string) {
        this.loopFormula = formula;
        this.model.loop_formula = formula;
        this.setValue('loop_formula', formula);
    }
}
