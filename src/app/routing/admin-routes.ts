import { AdminAboutComponent } from '../content/pages/admin/admin-about/admin-about.component';
import { AdminblogsComponent } from '../content/pages/admin/adminblogs/adminblogs.component';
import { DepartmentComponent } from '../content/pages/admin/department/department.component';
import { AdminDoctorsComponent } from '../content/pages/admin/doctors/doctors.component';
import { AdminHomeComponent } from '../content/pages/admin/home/home.component';
import { LoginComponent } from '../content/pages/admin/login/login.component';
import { ServicesComponent } from '../content/pages/admin/services/services.component';
import { SlidersComponent } from '../content/pages/admin/sliders/sliders.component';
import { ActivateGuard } from '../guards/auth.guard';

export const adminRoutes = [
    
    {
        path: 'Login', component: LoginComponent,
    },
       {
        path: 'AdminHome', component: AdminHomeComponent,
        canActivate: [ActivateGuard],

        loadChildren: () => import('../content/pages/admin/home/home.module'
        ).then((m) => m.HomeModule)
    },
    {
        path: 'AdminAbout', component: AdminAboutComponent,
        canActivate: [ActivateGuard],

        loadChildren: () => import('../content/pages/admin/admin-about/admin-about.module'
        ).then((m) => m.AdminAboutModule)
    },
    {
        path: 'Departments', component: DepartmentComponent,
        canActivate: [ActivateGuard],

    },
    {
        path: 'AdminDoctors', component: AdminDoctorsComponent,
        canActivate: [ActivateGuard],

    },
    {
        path: 'Sliders', component: SlidersComponent,
        canActivate: [ActivateGuard],

    },
    {
        path: 'AdminServices', component: ServicesComponent,
        canActivate: [ActivateGuard],

    },
    {
        path: 'AdminBlogs', component: AdminblogsComponent,
        canActivate: [ActivateGuard],

    },
    // {
    //     path: '', component: LoginComponent,
    // },

    
]

