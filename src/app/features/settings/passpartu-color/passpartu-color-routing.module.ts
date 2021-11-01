import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasspartuColorComponent } from './passpartu-color.component';

const routes: Routes = [{ path: '', component: PasspartuColorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasspartuColorRoutingModule {}
