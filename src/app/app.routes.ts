import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../features/dashboard/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('../features/dashboard/tasks/tasks.component').then(
        (m) => m.TasksComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
