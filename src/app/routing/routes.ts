import { AboutComponent } from '../content/pages/about/about.component';
import { AdminComponent } from '../content/pages/admin/admin.component';
import { AdminHomeComponent } from '../content/pages/admin/home/home.component';
import { ContactComponent } from '../content/pages/contact/contact.component';
import { HomeComponent } from '../content/pages/home/home.component';
import { ServicesComponent } from '../content/pages/services/services.component';

export const mainRoutes = [

    {
        path: '', component: HomeComponent,
        loadChildren: () => import('../content/pages/home/home.module'
        ).then((m) => m.HomeModule)
    },
    {
        path: 'Home', component: HomeComponent,
        loadChildren: () => import('../content/pages/home/home.module'
        ).then((m) => m.HomeModule)
    },
    {
        path: 'About', component: AboutComponent,
        loadChildren: () => import('../content/pages/about/about.module'
        ).then((m) => m.AboutModule)
    },
    {
        path: 'Contact', component: ContactComponent,
        loadChildren: () => import('../content/pages/contact/contact.module'
        ).then((m) => m.ContactModule)
    },
    {
        path: 'Service', component: ServicesComponent,
        loadChildren: () => import('../content/pages/services/services.module'
        ).then((m) => m.ServicesModule)
    },
    {
        path: 'Admin', component: AdminHomeComponent,
        loadChildren: () => import('../content/pages/admin/admin.module'
        ).then((m) => m.AdminModule)
    },
]