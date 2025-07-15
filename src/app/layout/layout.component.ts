import {
    Component, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@Component({
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule
    ],
})
export class LayoutComponent implements OnInit {

    constructor(
    ) {
    }
    isCollapsed = false;

    ngOnInit() {

    }

}
