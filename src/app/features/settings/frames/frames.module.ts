import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FramesComponent } from './frames.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [FramesComponent],
  declarations: [FramesComponent],
})
export class FramesModule {}
