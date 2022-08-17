import { AdminAboutComponent } from '../content/pages/admin/admin-about/admin-about.component';
import { AdminHomeComponent } from '../content/pages/admin/home/home.component';

export const adminRoutes = [
    
    {
        path: 'AdminHome', component: AdminHomeComponent,
        loadChildren: () => import('../content/pages/admin/home/home.module'
        ).then((m) => m.HomeModule)
    },
    {
        path: 'AdminAbout', component: AdminAboutComponent,
        loadChildren: () => import('../content/pages/admin/admin-about/admin-about.module'
        ).then((m) => m.AdminAboutModule)
    },
]