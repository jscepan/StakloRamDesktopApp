import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsLayoutComponent } from './settings-layout.component';

const routes: Routes = [
  { path: '', component: SettingsLayoutComponent },
  {
    path: 'appSettings',
    loadChildren: () =>
      import('@features/settings/app-settings/app-settings.module').then(
        (m) => m.AppSettingsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsLayoutRoutingModule {}
