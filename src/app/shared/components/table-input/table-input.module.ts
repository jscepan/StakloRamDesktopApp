import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TableInputComponent } from './table-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [CommonModule, ButtonModule, MatInputModule, MatSelectModule],
  exports: [TableInputComponent],
  declarations: [TableInputComponent],
})
export class TableInputModule {}
