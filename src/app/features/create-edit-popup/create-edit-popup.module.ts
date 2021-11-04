import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateEditPopupComponent } from './create-edit-popup.component';

@NgModule({
  declarations: [CreateEditPopupComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [CreateEditPopupComponent],
  entryComponents: [CreateEditPopupComponent],
})
export class CreateEditPopupModule {}
