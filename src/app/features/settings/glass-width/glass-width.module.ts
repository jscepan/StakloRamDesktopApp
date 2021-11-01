import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { GlassWidthComponent } from './glass-width.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [GlassWidthComponent],
  declarations: [GlassWidthComponent],
})
export class GlassWidthModule {}
