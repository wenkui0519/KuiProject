import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FlowFormModule } from '../flow-form/flow-form.module';
//
import { PreviewComponent } from './preview.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlowFormModule
    ],
    declarations: [
        PreviewComponent
    ],
    exports: [PreviewComponent],
    providers: [],
    entryComponents: [
        PreviewComponent
    ]
})
export class PreviewModule { }
