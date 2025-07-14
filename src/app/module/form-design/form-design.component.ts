// import { angular } from 'core/angular-utils';

import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { ControlListComponent } from './component/control-list/control-list.component';
import { ControlAttributeComponent } from './component/control-attribute/control-attribute.component';
@Component({
    standalone: true,
    selector: 'form-design',
    templateUrl: './form-design.component.html',
    styleUrls: ['./form-design.component.scss'],
    imports: [
        CommonModule,
        ControlListComponent,
        ControlAttributeComponent,
    ],
})
export class FormDesignComponent implements OnInit {


    constructor(
    ) {
    }
    ngOnInit() {

    }

}
