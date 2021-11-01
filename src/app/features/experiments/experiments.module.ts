import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { ExperimentsComponent } from './experiments.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [ExperimentsComponent],
  declarations: [ExperimentsComponent],
})
export class ExperimentsModule {}
