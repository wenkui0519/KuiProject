import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'web-preview',
    templateUrl: './preview.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit() {
    }
}
