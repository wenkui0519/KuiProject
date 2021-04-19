import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EuiEditorModule } from 'src/app/shared/component/editor';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './title/title.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EuiEditorModule,
    ],
    declarations: [
        TitleComponent,
    ],
    entryComponents: [
        TitleComponent,
    ],
})
export class AttributeModule { }
