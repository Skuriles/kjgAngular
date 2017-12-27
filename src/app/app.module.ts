import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import localeDe from "@angular/common/locales/de";
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { HttpService } from "./services/http.service";
import { DrinksComponent } from "./drinks/drinks.component";
import { LoginComponent } from "./login/login.component";
import { UsersComponent } from "./users/users.component";
import { RegisterComponent } from "./register/register.component";
import { LoginService } from "./services/login.service";
import { AuthguardService } from "./services/authguard.service";
import { UserDrinksAdminComponent } from "./user-drinks-admin/user-drinks-admin.component";
import { DrinksAdminComponent } from "./drinks-admin/drinks-admin.component";
import { OverviewComponent } from "./overview/overview.component";
import { DrinkService } from "./services/drink.service";
import { DailyWinnerComponent } from "./daily-winner/daily-winner.component";
import { DailyPlanComponent } from "./daily-plan/daily-plan.component";
import { JobsComponent } from "./jobs/jobs.component";
import { DayComponent } from "./day/day.component";
import { ProgramComponent } from "./program/program.component";


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
    DailyWinnerComponent,
    DailyPlanComponent,
    JobsComponent,
    DayComponent,
    ProgramComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
        enabled: environment.production
    })
  ],
  providers: [HttpService, LoginService, AuthguardService, DrinkService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
