import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TableInputModule } from 'src/app/shared/components/table-input/table-input.module';
import { FramesRoutingModule } from './frames-routing.module';
import { FramesComponent } from './frames.component';

@NgModule({
  imports: [CommonModule, ButtonModule, FramesRoutingModule, TableInputModule],
  exports: [FramesComponent],
  declarations: [FramesComponent],
})
export class FramesModule {}
