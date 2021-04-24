import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: LayoutComponent,
      data: {
        rootRoute: true
      },
    },
    {
      path: 'form',
      loadChildren: () => import('./module/form/form.module').then(m => m.FormModule)
    },
    {
      path: 'demo',
      loadChildren: () => import('./module/demo/demo.module').then(m => m.DemoModule)
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
