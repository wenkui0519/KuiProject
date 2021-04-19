import { CommonModule } from '@angular/common';
import {
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        EditorComponent,
    ],
    exports: [
        EditorComponent,
        ],
    entryComponents: []
})
export class EditorModule {
    static forRoot(): ModuleWithProviders<EditorModule> {
        return {
            ngModule: EditorModule,
            providers: [ ],
        };
    }
}
