import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { KeyboardNumericComponent } from './keyboard-numeric.component';

@NgModule({
  declarations: [KeyboardNumericComponent],
  imports: [CommonModule, ButtonModule, MatDialogModule, MatInputModule],
  exports: [KeyboardNumericComponent],
  entryComponents: [KeyboardNumericComponent],
})
export class KeyboardNumericModule {}
