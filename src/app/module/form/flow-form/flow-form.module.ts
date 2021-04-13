import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

// import { ControlModule } from './control/control.module';
import { FlowFormComponent } from './flow-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    declarations: [
        FlowFormComponent,
    ],
    exports: [
        FlowFormComponent
    ],
})
export class FlowFormModule { }
