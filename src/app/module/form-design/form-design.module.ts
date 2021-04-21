// import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlAttributeModule } from './component/control-attribute/control-attribute.module';
import { ControlListComponent } from './component/control-list/control-list.component';
import { FormEditorComponent } from './component/form-editor/form-editor.component';
import { FormDesignComponent } from './form-design.component';

@NgModule({
    imports: [
        CommonModule,
        ControlAttributeModule
    ],
    declarations: [
        FormDesignComponent,
        FormEditorComponent,
        ControlListComponent
    ],
    exports: [
        FormDesignComponent
    ]

})
export class FormDesignModule { }
