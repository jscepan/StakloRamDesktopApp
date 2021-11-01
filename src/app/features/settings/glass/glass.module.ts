import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { GlassComponent } from './glass.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [GlassComponent],
  declarations: [GlassComponent],
})
export class GlassModule {}
