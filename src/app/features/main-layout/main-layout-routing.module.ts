import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
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
        path: 'glassing',
        loadChildren: () =>
          import('@features/glassing/glassing.module').then(
            (m) => m.GlassingModule
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
