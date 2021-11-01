import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SandblastingRoutingModule } from './sandblasting-routing.module';
import { SandblastingComponent } from './sandblasting.component';

@NgModule({
  imports: [CommonModule, ButtonModule, SandblastingRoutingModule],
  exports: [SandblastingComponent],
  declarations: [SandblastingComponent],
})
export class SandblastingModule {}
