import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacetingComponent } from './faceting.component';

const routes: Routes = [{ path: '', component: FacetingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacetingRoutingModule {}
