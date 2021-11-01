import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'framing',
        loadChildren: () =>
          import('@features/framing/framing.module').then(
            (m) => m.FramingModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@features/settings/settings-layout.module').then(
            (m) => m.SettingsLayoutModule
          ),
      },
      {
        path: 'app-settings',
        loadChildren: () =>
          import('@features/settings/app-settings/app-settings.module').then(
            (m) => m.AppSettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
