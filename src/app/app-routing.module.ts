import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


const routes: Routes = [{path: 'register', component: RegistrationComponent},
{path: 'login', component: LoginComponent},
{path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
{path: 'update/employee', component: UpdateEmployeeComponent},
{path: '', redirectTo: '/login', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
