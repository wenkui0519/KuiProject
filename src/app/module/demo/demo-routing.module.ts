import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component'


const routes: Routes = [
    // {
    //     path: 'login',
    //     loadChildren: () =>
    //         import('./login/login.component').then(m => m.LoginComponent)
    // },
    {
        path: 'login',
        component: LoginComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule { }
