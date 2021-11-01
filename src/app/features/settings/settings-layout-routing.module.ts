import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsLayoutComponent } from './settings-layout.component';

const routes: Routes = [
  { path: '', component: SettingsLayoutComponent },
  {
    path: 'app-settings',
    loadChildren: () =>
      import('@features/settings/app-settings/app-settings.module').then(
        (m) => m.AppSettingsModule
      ),
  },
  {
    path: 'faceting',
    loadChildren: () =>
      import('@features/settings/faceting/faceting.module').then(
        (m) => m.FacetingModule
      ),
  },
  {
    path: 'frames',
    loadChildren: () =>
      import('@features/settings/frames/frames.module').then(
        (m) => m.FramesModule
      ),
  },
  {
    path: 'glass',
    loadChildren: () =>
      import('@features/settings/glass/glass.module').then(
        (m) => m.GlassModule
      ),
  },
  {
    path: 'glass-width',
    loadChildren: () =>
      import('@features/settings/glass-width/glass-width.module').then(
        (m) => m.GlassWidthModule
      ),
  },
  {
    path: 'passpartu',
    loadChildren: () =>
      import('@features/settings/passpartu/passpartu.module').then(
        (m) => m.PasspartuModule
      ),
  },
  {
    path: 'passpartu-color',
    loadChildren: () =>
      import('@features/settings/passpartu-color/passpartu-color.module').then(
        (m) => m.PasspartuColorModule
      ),
  },
  {
    path: 'sandblasting',
    loadChildren: () =>
      import('@features/settings/sandblasting/sandblasting.module').then(
        (m) => m.SandblastingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsLayoutRoutingModule {}
