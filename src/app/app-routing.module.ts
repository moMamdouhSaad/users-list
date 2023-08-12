import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from 'src/app/core/auth/guards/isLoggedInGuard.guard';
import { LoginComponent } from 'src/app/core/auth/login/login.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { SignupComponent } from './core/auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/users-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [IsLoggedInGuard] },
  {
    path: 'sign-up', component: SignupComponent, canActivate: [IsLoggedInGuard]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users-list',
        loadComponent: () => import('./pages/users-list/users-list.component').then(c => c.UsersListComponent),
      },
      {
        path: 'users/:id',
        loadComponent: () => import('./pages/single-user/single-user.component').then(c => c.SingleUserComponent),
      },
      {
        path: 'update-user/:id',
        loadComponent: () => import('./pages/user-editor/update-user.component').then(c => c.UserEditorComponent),
      },
      {
        path: 'new-user',
        loadComponent: () => import('./pages/user-editor/update-user.component').then(c => c.UserEditorComponent),
      },
    ]
  },
  { path: '**', redirectTo: '/users-list', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
