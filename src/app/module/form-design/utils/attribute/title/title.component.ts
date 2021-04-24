
import {
    ChangeDetectorRef, Component,Input,OnInit
} from '@angular/core';

import { AttributeService } from '../../service/attribute.service';

@Component({
    selector: 'control-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

    @Input() attribute: object;

    public title: string;
    constructor(
        private ref: ChangeDetectorRef,
        private attributeService: AttributeService,
    ) {
    }

    ngOnInit() {
        this.title = this.attributeService.get(this.attribute, 'title', 'attribute');
        this.ref.detectChanges();
    }

    public changeTitle(value) {
        this.attributeService.set(this.attribute, 'title', value, 'attribute');
    }
}
