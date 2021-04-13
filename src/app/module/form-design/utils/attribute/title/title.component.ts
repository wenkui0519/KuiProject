import {
    ChangeDetectorRef, Component, Input,OnInit,
} from '@angular/core';

@Component({
    selector: 'control-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

    @Input() attribute: object;

    constructor(
        private ref: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
    }
}
