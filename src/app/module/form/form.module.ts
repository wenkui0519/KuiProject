import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlowFormModule } from './flow-form/flow-form.module';
import { FormBuilderModule } from './form-builder/form-builder.module';
import { FormRoutingModule } from './form-routing.module';
import { ListModule } from './list/list.module';
import { PreviewModule } from './preview/preview.module';

@NgModule({
    imports: [
        CommonModule,
        FormRoutingModule,
    ],
    declarations: [
    ],
    exports: [
        FormBuilderModule,
        PreviewModule,
        FlowFormModule,
        ListModule
    ]
})
export class FormModule { }
