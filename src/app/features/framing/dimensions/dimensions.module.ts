import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DimensionsComponent } from './dimensions.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SelectionPopupModule } from '@features/selection-popup/selection-popup.module';
import { TranslateModule } from '@ngx-translate/core';
import { KeyboardNumericModule } from 'src/app/shared/components/keyboard/numeric/keyboard-numeric.module';

@NgModule({
  declarations: [DimensionsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    MatCheckboxModule,
    SelectionPopupModule,
    ReactiveFormsModule,
    KeyboardNumericModule,
  ],
  exports: [DimensionsComponent],
  providers: [],
})
export class DimensionsModule {}
