import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { KeyboardAlphabetComponent } from './keyboard-alphabet.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [KeyboardAlphabetComponent],
  declarations: [KeyboardAlphabetComponent],
})
export class KeyboardAlphabetModule {}
