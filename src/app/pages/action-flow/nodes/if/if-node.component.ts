import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { FormulaComponent } from '../../shared/formula/formula.component';
import { NodeBaseDirective } from '../node-base';


@Component({
    selector: 'action-flow-if-node',
    standalone: true,
    templateUrl: './if-node.component.html',
    styleUrls: ['./if-node.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        FormulaComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IfNodeComponent extends NodeBaseDirective implements OnInit {
    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    // 数据标识
    public formula;

    ngOnInit() {
        super.ngOnInit();
        this.initButtons();
        if (this.model.formula) {
            this.formula = this.model.formula;
        }
    }
    // 修改公式
    public changeFormula(formula: string) {
        this.formula = formula;
        if (!this.model.data) {
            this.model.data = {}
        }
        this.model.formula = formula;
        this.setValue('formula', formula);
    }
}
