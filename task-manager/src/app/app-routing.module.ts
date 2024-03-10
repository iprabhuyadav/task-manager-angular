import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTaskListComponent } from './view-task-list/view-task-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/view-task', pathMatch: 'full' },
  {path:'view-task', component:ViewTaskListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
