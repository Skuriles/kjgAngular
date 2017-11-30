import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { DrinksComponent } from './drinks/drinks.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './services/login.service';
import { AuthguardService } from './services/authguard.service';


@NgModule({
  declarations: [
    AppComponent,
    DrinksComponent,
    LoginComponent,
    UsersComponent,
    RegisterComponent   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService, LoginService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
