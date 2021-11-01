import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FacetingComponent } from './faceting.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [FacetingComponent],
  declarations: [FacetingComponent],
})
export class FacetingModule {}
