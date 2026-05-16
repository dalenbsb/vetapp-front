import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component')
      .then(m => m.ForgotPasswordComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
          .then(m => m.HomeComponent)
      },
      {
            path: 'especies',
            loadComponent: () =>
                import('./pages/especie/especie.component')
                    .then(m => m.EspecieComponent)
        },
        {
            path: 'cores',
            loadComponent: () =>
                import('./pages/cor/cor.component')
                    .then(m => m.CorComponent)
        },
         {
            path: 'users',
            loadComponent: () =>
                import('./pages/user/user.component')
                    .then(m => m.UserComponent)
        }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];