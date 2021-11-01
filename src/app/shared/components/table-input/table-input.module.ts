import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TableInputComponent } from './table-input.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [TableInputComponent],
  declarations: [TableInputComponent],
})
export class TableInputModule {}
