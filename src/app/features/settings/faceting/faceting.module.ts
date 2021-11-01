import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FacetingRoutingModule } from './faceting-routing.module';
import { FacetingComponent } from './faceting.component';

@NgModule({
  imports: [CommonModule, ButtonModule, FacetingRoutingModule],
  exports: [FacetingComponent],
  declarations: [FacetingComponent],
})
export class FacetingModule {}
