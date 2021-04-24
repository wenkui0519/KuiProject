import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EuiEditorModule } from 'src/app/shared/component/editor';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './title/title.component';
import { IdComponent } from './id/id.component';
import { TypeComponent } from './type/type.component';
import { WidthComponent } from './width/width.component';
import { HeightComponent } from './height/height.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EuiEditorModule,
    ],
    declarations: [
        TitleComponent,
        IdComponent,
        TypeComponent,
        WidthComponent,
        HeightComponent,
    ],
    entryComponents: [
        TitleComponent,
        IdComponent,
        TypeComponent,
        WidthComponent,
        HeightComponent,
    ],
})
export class AttributeModule { }
