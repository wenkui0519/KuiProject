import {
    Component, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
})
export class LayoutComponent implements OnInit {

    constructor(
    ) {
    }

    ngOnInit() {

    }

}
