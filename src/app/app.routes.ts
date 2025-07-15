import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'action-flow',
                loadComponent: () => import('./pages/action-flow/action-flow.component').then(m => m.ActionFlowSettingComponent),
            },
            { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
        ],
    },
];
