
import {
    ChangeDetectorRef, Component,Input,OnInit
} from '@angular/core';

import { AttributeService } from '../../service/attribute.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'control-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
    ],
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
        this.title = this.attributeService.get(this.attribute, 'attribute.title');
        this.ref.detectChanges();
    }

    public changeTitle(value) {
        this.attributeService.set(this.attribute, 'attribute.title', value);
    }
}
