import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilderModule } from '../form-builder/form-builder.module';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        FormBuilderModule,
        FormsModule,
    ],
    declarations: [
        ListComponent,
    ],
    exports: [ListComponent],
    entryComponents: [
    ]
})
export class ListModule { }
