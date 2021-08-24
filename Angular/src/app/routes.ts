import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { LoginComponent } from "./user/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


export const appRoutes : Routes =[
    {
        path:'login' , component:UserComponent,
        children:[{path:'', component:LoginComponent}]
    },
    {
        path:'signup',component:UserComponent,
        children:[{path:'', component:SignUpComponent}]
    },
    {
        path:'dashboard',component:DashboardComponent,
        children:[{path:'', component:DashboardComponent}]
    },
    {
        path: '',redirectTo:'/login' ,pathMatch:'full'
    }
];