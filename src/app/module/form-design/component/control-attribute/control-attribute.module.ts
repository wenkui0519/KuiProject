import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlAttributeComponent } from './control-attribute.component';
import { TemplateModule } from '../../utils/template/template.module';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule
  ],
  declarations: [
    ControlAttributeComponent
  ],
  exports: [
    ControlAttributeComponent
  ]
})
export class ControlAttributeModule { }
