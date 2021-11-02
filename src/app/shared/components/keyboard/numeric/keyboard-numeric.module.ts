import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { KeyboardNumericComponent } from './keyboard-numeric.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [KeyboardNumericComponent],
  declarations: [KeyboardNumericComponent],
})
export class KeyboardNumericModule {}
