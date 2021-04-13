import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ListComponent } from './list/list.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'list',
            data: {
                menuId: 201
            },
            component: ListComponent
        }, {
            path: 'editor',
            component: FormBuilderComponent,
            data: {
                isModal: true
            }
        }, {
            path: 'preview',
            component: PreviewComponent,
            data: {
                isModal: true
            }
        }]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule { }
