import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainComponents/header/header.component';
import { FooterComponent } from './components/mainComponents/footer/footer.component';
import { LoginComponent } from './components/userComponents/login/login.component';
import { RegisterComponent } from './components/userComponents/register/register.component';
import { ProfileComponent } from './components/userComponents/profile/profile.component';
import { HomepageComponent } from './components/mainComponents/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
