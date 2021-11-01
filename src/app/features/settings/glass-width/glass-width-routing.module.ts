import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlassWidthComponent } from './glass-width.component';

const routes: Routes = [{ path: '', component: GlassWidthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlassWidthRoutingModule {}
