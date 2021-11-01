import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandblastingComponent } from './sandblasting.component';

const routes: Routes = [{ path: '', component: SandblastingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandblastingRoutingModule {}
