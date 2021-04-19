// import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormEditorComponent } from './component/form-editor/form-editor.component';
import { FormDesignComponent } from './form-design.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FormDesignComponent,
        FormEditorComponent
    ],
    exports: [
        FormDesignComponent
    ]

})
export class FormDesignModule { }
