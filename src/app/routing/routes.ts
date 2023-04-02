import { AboutComponent } from '../content/pages/about/about.component';
import { AdminComponent } from '../content/pages/admin/admin.component';
import { AdminDoctorsComponent } from '../content/pages/admin/doctors/doctors.component';
import { AdminHomeComponent } from '../content/pages/admin/home/home.component';
import { LoginComponent } from '../content/pages/admin/login/login.component';
import { BlogsComponent } from '../content/pages/blogs/blogs.component';
import { ContactComponent } from '../content/pages/contact/contact.component';
import { DoctorProfileComponent } from '../content/pages/doctorprofile/doctorprofile.component';
import { DoctorsComponent } from '../content/pages/doctors/doctors.component';
import { HomeComponent } from '../content/pages/home/home.component';
import { LabreportdownloadComponent } from '../content/pages/labreportdownload/labreportdownload.component';
import { OpdtimesComponent } from '../content/pages/opdtimes/opdtimes.component';
import { PageComponent } from '../content/pages/page/page.component';
import { ServiceOneComponent } from '../content/pages/services/servicePages/service-one/service-one.component';
import { ServicesComponent } from '../content/pages/services/services.component';
import { ActivateGuard } from '../guards/auth.guard';

export const mainRoutes = [

   
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
        path: 'Service', 
        loadChildren: () => import('../content/pages/services/services.module'
        ).then((m) => m.ServicesModule),
    },
    {
        path: 'DoctorsList', 
        component:DoctorsComponent
    },
   
    {
        path: 'Page/:id', 
        component:PageComponent
    
    },
    {
        path: 'Page/:id/:id2', 
        component:PageComponent
    
    },
    {
        path: 'Page/:id/:id2/:id3', 
        component:PageComponent
        },

    {
        path: 'Blogs', 
        component:BlogsComponent
    
    },
    
    {
        path: 'LabReportDownload', 
        component:LabreportdownloadComponent
    
    },
    {
        path: 'OpdTimings', 
        component:OpdtimesComponent
    
    },

    {
        path: 'Admin',
        loadChildren: () => import('../content/pages/admin/admin.module'
        ).then((m) => m.AdminModule),

    },

    {
        path: '', component: HomeComponent,
        loadChildren: () => import('../content/pages/home/home.module'
        ).then((m) => m.HomeModule),
    },
    
    {
        path: ' ', component: HomeComponent,
        loadChildren: () => import('../content/pages/home/home.module'
        ).then((m) => m.HomeModule),
    },
    
    {
        path: 'webapp', component: HomeComponent,
        loadChildren: () => import('../content/pages/home/home.module'
        ).then((m) => m.HomeModule),
    },


    
]

export const PageRoutes=[
    {
        path: 'Page/:id', 
        component:PageComponent
    
    },  
    {
        path: 'Page/:id/:id2', 
        component:PageComponent
    
    },
    {
        path: 'Page/:id/:id2/:id3', 
        component:PageComponent
        },

];