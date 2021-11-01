import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlassComponent } from './glass.component';

const routes: Routes = [{ path: '', component: GlassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlassRoutingModule {}
