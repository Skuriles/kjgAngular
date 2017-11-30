import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DrinksComponent } from './drinks/drinks.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'drinks',
    component: DrinksComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthguardService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
