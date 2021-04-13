import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeModule } from '../attribute/attribute.module';
import { TemplateComponent } from './template.component';

@NgModule({
    imports: [
        CommonModule,
        AttributeModule
    ],
    declarations: [
        TemplateComponent
    ],
    exports: [
        TemplateComponent,
        AttributeModule
    ]
})
export class TemplateModule { }
