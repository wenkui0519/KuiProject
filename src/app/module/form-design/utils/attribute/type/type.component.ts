
import {
    ChangeDetectorRef, Component, Input, OnInit
} from '@angular/core';

import { AttributeService } from '../../service/attribute.service';

@Component({
    selector: 'control-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

    @Input() attribute: object;

    public type;
    constructor(
        private ref: ChangeDetectorRef,
        private attributeService: AttributeService,
    ) {
    }

    ngOnInit() {
        this.type = this.attributeService.get(this.attribute, 'data-efb-control', 'attribute');
        this.ref.detectChanges();
    }
}
