import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SpotDetailsComponent } from './spot-details/spot-details.component';
import { SpotListComponent } from './spot-list/spot-list.component';
import { CalculateComponent } from './calculate/calculate.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'signup',
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'spots',
    component: SpotListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'calculate',
    component: CalculateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'spotsdetails/:name', component: SpotDetailsComponent,canActivate: [AuthGuard] },
  {path: '', component: HomeComponent,canActivate:[GuestGuard]},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
