import { ServiceOneComponent } from '../content/pages/services/servicePages/service-one/service-one.component';
import { ServiceTwoComponent } from '../content/pages/services/servicePages/service-two/service-two.component';
import { ServicesComponent } from '../content/pages/services/services.component';

export const serviceRoutes = [
    {
        path: '', 
        loadChildren: () => import('../content/pages/services/services.module'
        ).then((m) => m.ServicesModule),
        component: ServicesComponent,
        children : [
            {
                path :'ServiceOne',
                outlet : 'ServiceName',
                loadChildren: () =>
                            import('../../app/content/pages/services/servicePages/service-one/service-one.module').then(
                                (m) => m.ServiceOneModule,),
                        component: ServiceOneComponent
            },
            {
                path :'ServiceOne/:id',
                outlet : 'ServiceName',
                loadChildren: () =>
                            import('../../app/content/pages/services/servicePages/service-one/service-one.module').then(
                                (m) => m.ServiceOneModule,),
                        component: ServiceOneComponent
            },
            {
                path :'ServiceTwo',
                outlet : 'ServiceName',
                loadChildren: () =>
                            import('../../app/content/pages/services/servicePages/service-two/service-two.module').then(
                                (m) => m.ServiceTwoModule,),
                        component: ServiceTwoComponent
            }
        ]
    },
]