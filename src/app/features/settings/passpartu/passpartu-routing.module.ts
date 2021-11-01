import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasspartuComponent } from './passpartu.component';

const routes: Routes = [{ path: '', component: PasspartuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasspartuRoutingModule {}
