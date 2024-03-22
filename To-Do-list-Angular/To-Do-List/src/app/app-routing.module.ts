import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './services/auth-guard.service'; 
import { TodoListFormComponent } from './todo-list-form/todo-list-form.component';
import { TaskComponent } from './task/task.component';
import { ArchiveTaskComponent } from './archive-task/archive-task.component';
//import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';




const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'todo-list',
    component: TodoListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService], 
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuardService], // Apply the AuthGuardService
  },
  {
    path: 'todo-list-form',
    component: TodoListFormComponent,
    canActivate: [AuthGuardService], 
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivate: [AuthGuardService], 
    //canDeactivate: [CanDeactivateGuardService ]
  },
  {
    path: 'archive-task',
    component: ArchiveTaskComponent,
    canActivate: [AuthGuardService], 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
