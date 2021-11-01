import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DimensionsComponent } from './dimensions.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DimensionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DimensionsComponent],
})
export class DimensionsModule {}
