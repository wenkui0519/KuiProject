import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EuiEditorModule } from 'src/app/shared/component/editor';
import { FormsModule } from '@angular/forms';

import { TitleComponent } from './title/title.component';
import { IdComponent } from './id/id.component';
import { TypeComponent } from './type/type.component';
import { WidthComponent } from './width/width.component';
import { HeightComponent } from './height/height.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { IdModalComponent } from './id-modal/id-modal.component';
import { ModalModule } from 'src/app/shared/component/modal/modal.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EuiEditorModule,
        ModalModule
    ],
    declarations: [
        TitleComponent,
        IdComponent,
        TypeComponent,
        WidthComponent,
        HeightComponent,
        PlaceholderComponent,
        IdModalComponent,
    ],
    entryComponents: [
        TitleComponent,
        IdComponent,
        TypeComponent,
        WidthComponent,
        HeightComponent,
        PlaceholderComponent,
        IdModalComponent
    ],
    providers:[
    ]
})
export class AttributeModule { }
