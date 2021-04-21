
import {
    ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChange
} from '@angular/core';

import { AttributeService } from '../../service/attribute.service';
import { UtilsAttributeService } from '../control-attribute.service';

@Component({
    selector: 'control-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

    @Input() attribute: object;

    public title: string;
    private id;
    private type;
    public controlTitleLang;
    constructor(
        private ref: ChangeDetectorRef,
        private attributeService: AttributeService,
    ) {
    }

    ngOnInit() {
        this.id = this.attributeService.get(this.attribute, 'id', 'attribute');
        this.type = this.attributeService.get(this.attribute, 'data-efb-control', 'attribute');
        this.title = this.attributeService.get(this.attribute, 'title', 'attribute');
        this.ref.detectChanges();
    }

    public changeTitle(value) {
        this.attributeService.set(this.attribute, 'title', value, 'attribute');
    }
}
