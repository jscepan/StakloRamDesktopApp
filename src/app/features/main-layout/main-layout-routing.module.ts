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
        path: 'invoices',
        loadChildren: () =>
          import('@features/invoices/invoices.module').then(
            (m) => m.InvoicesModule
          ),
      },
      {
        path: 'invoiceCreate',
        loadChildren: () =>
          import(
            '@features/invoice-create-edit/invoice-create-edit.module'
          ).then((m) => m.InvoiceCreateEditModule),
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
