import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { KeyboardAlphabetComponent } from './keyboard-alphabet.component';

@NgModule({
  imports: [CommonModule, ButtonModule, MatDialogModule],
  exports: [KeyboardAlphabetComponent],
  declarations: [KeyboardAlphabetComponent],
})
export class KeyboardAlphabetModule {}
