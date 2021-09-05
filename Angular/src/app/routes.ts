import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { LoginComponent } from "./user/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditProductComponent } from "./dashboard/edit-product/edit-product.component";
import { AuthGuard } from "./guard/auth.guard";


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
        path:'dashboard', canActivate:[AuthGuard], component:DashboardComponent,
        children:[{path:'', component:DashboardComponent}]
    },
    {
        path:'edit-product/:id',canActivate:[AuthGuard], component:EditProductComponent
    },
    {
        path: '',redirectTo:'/login' ,pathMatch:'full'
    },
    {
        path: '**',redirectTo:'/login' ,pathMatch:'full'
    },
];