import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { GlassWidthRoutingModule } from './glass-width-routing.module';
import { GlassWidthComponent } from './glass-width.component';

@NgModule({
  imports: [CommonModule, ButtonModule, GlassWidthRoutingModule],
  exports: [GlassWidthComponent],
  declarations: [GlassWidthComponent],
})
export class GlassWidthModule {}
