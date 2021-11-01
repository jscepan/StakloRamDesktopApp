import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { PasspartuColorRoutingModule } from './passpartu-color-routing.module';
import { PasspartuColorComponent } from './passpartu-color.component';

@NgModule({
  imports: [CommonModule, ButtonModule, PasspartuColorRoutingModule],
  exports: [PasspartuColorComponent],
  declarations: [PasspartuColorComponent],
})
export class PasspartuColorModule {}
