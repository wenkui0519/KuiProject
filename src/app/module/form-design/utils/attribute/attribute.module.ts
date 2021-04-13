import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './title/title.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TitleComponent,
    ],
    entryComponents: [
        TitleComponent,
    ],
})
export class AttributeModule { }
