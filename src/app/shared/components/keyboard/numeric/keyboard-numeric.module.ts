import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { KeyboardNumericComponent } from './keyboard-numeric.component';

@NgModule({
  declarations: [KeyboardNumericComponent],
  imports: [CommonModule, ButtonModule, MatDialogModule],
  exports: [KeyboardNumericComponent],
  entryComponents: [KeyboardNumericComponent],
})
export class KeyboardNumericModule {}
