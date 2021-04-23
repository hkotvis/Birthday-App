import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthdayPageComponent } from './birthday-page/birthday-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'list', component: BirthdayPageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
