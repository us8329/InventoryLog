import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup ,FormControl } from '@angular/forms';
import { NgxPaginationModule  } from 'ngx-pagination';


//component import 
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//routes
import { appRoutes } from './routes';
import { UserService } from './shared/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guard/auth.guard';
import { EditProductComponent } from './dashboard/edit-product/edit-product.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    LoginComponent,
    DashboardComponent,
    EditProductComponent,

  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [ UserService , AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
