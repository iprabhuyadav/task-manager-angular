import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTaskListComponent } from './view-task-list/view-task-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full' },
  { path:'view-task', component:ViewTaskListComponent },
  { path:'user-registration', component:UserRegistrationComponent },
  { path:'user-login', component:UserLoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
