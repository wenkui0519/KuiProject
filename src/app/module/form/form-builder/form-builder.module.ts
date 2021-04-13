
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormDesignModule } from '../../form-design/form-design.module';
import { FormBuilderComponent } from './form-builder.component';
@NgModule({
    imports: [
        CommonModule,
        FormDesignModule
    ],
    declarations: [
        FormBuilderComponent
    ]
})
export class FormBuilderModule { }
