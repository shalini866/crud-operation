import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
     path : 'dashboard',
     component : DashboardComponent
  },
  {
    path: '',
    redirectTo: '/profile', 
    pathMatch: 'full',
  },

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),ProfileRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
