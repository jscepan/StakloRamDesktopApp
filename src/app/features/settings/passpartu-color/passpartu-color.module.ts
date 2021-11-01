import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { PasspartuColorComponent } from './passpartu-color.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [PasspartuColorComponent],
  declarations: [PasspartuColorComponent],
})
export class PasspartuColorModule {}
