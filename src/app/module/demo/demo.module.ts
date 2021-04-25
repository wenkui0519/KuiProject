import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent} from './login/login.component'
import { DemoRoutingModule } from './demo-routing.module'
import { ModalComponent} from './modal/modal.component'
import { ModalModule } from 'src/app/shared/component/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule,
    ModalModule
  ],
  declarations: [
    LoginComponent,
    ModalComponent,
  ]
})
export class DemoModule { }
