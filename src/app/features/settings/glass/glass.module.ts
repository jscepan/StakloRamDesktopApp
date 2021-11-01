import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { GlassRoutingModule } from './glass-routing.module';
import { GlassComponent } from './glass.component';

@NgModule({
  imports: [CommonModule, ButtonModule, GlassRoutingModule],
  exports: [GlassComponent],
  declarations: [GlassComponent],
})
export class GlassModule {}
