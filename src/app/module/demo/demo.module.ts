import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent} from './login/login.component'
import { DemoRoutingModule } from './demo-routing.module'

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class DemoModule { }
