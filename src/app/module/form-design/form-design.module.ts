// import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormDesignComponent } from './form-design.component';
@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FormDesignComponent,
    ],
    exports: [
        FormDesignComponent
    ]

})
export class FormDesignModule { }
