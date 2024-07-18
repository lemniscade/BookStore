import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/mainComponents/homepage/homepage.component';
import { LoginComponent } from './components/userComponents/login/login.component';
import { RegisterComponent } from './components/userComponents/register/register.component';
import { ProfileComponent } from './components/userComponents/profile/profile.component';
const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
