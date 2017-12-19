import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { PushNotificationsModule, PushNotificationsService } from 'ng-push';

import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { DrinksComponent } from './drinks/drinks.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './services/login.service';
import { AuthguardService } from './services/authguard.service';
import { UserDrinksAdminComponent } from './user-drinks-admin/user-drinks-admin.component';
import { DrinksAdminComponent } from './drinks-admin/drinks-admin.component';
import { MaterializeModule } from 'angular2-materialize';
import { OverviewComponent } from './overview/overview.component';
import { DrinkService } from './services/drink.service';
import { DailyWinnerComponent } from './daily-winner/daily-winner.component';


@NgModule({
  declarations: [
    AppComponent,
    DrinksComponent,
    LoginComponent,
    UsersComponent,
    RegisterComponent,
    UserDrinksAdminComponent,
    DrinksAdminComponent,
    OverviewComponent,
    DailyWinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MaterializeModule,
    PushNotificationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
        enabled: environment.production
    })
  ],
  providers: [HttpService, LoginService, AuthguardService, DrinkService, PushNotificationsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
