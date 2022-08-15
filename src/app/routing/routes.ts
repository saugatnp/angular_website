import { AboutComponent } from '../content/pages/about/about.component';
import { ContactComponent } from '../content/pages/contact/contact.component';
import { HomeComponent } from '../content/pages/home/home.component';

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
        loadChildren: () => import('../content/pages//contact/contact.module'
        ).then((m) => m.ContactModule)
    },
]