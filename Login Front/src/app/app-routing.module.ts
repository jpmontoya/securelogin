import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { privateGuard } from './guards/auth/private.guard';
import { loginGuard } from './guards/auth/login.guard';
import { permissionsGuard } from './guards/auth/permissions.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/public/public.module').then((m) => m.PublicModule)
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'private',
    canActivate: [privateGuard],
    loadChildren: () => import('./components/private/private.module').then((m) => m.PrivateModule)
  },
  {
    path: 'permissions',
    canActivate: [permissionsGuard],
    loadChildren: () => import('./components/permissions/permissions.module').then((m) => m.PermissionsModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./components/information/information.module').then((m) => m.InformationModule)
  },
  {
    path: '**',
    loadChildren: () => import('./components/public/public.module').then((m) => m.PublicModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
