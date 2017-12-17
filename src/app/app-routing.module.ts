import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DrinksComponent } from './drinks/drinks.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardService } from './services/authguard.service';
import { UserDrinksAdminComponent } from './user-drinks-admin/user-drinks-admin.component';
import { DrinksAdminComponent } from './drinks-admin/drinks-admin.component';
import { OverviewComponent } from './overview/overview.component';
import { DailyWinnerComponent } from './daily-winner/daily-winner.component';

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
    path: 'userDrinkAdmin',
    component: UserDrinksAdminComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'drinksAdmin',
    component: DrinksAdminComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'daily',
    component: DailyWinnerComponent,
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
