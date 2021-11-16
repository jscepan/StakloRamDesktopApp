import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FramingRoutingModule } from './framing-routing.module';
import { FramingComponent } from './framing.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatStepperModule } from '@angular/material/stepper';
import { IconsModule } from 'src/app/shared/modules/icons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SelectionPopupModule } from '@features/selection-popup/selection-popup.module';
import { FacetingSandingPopupModule } from './faceting-sanding-selection-popup/faceting-sanding-popup.module';
import { KeyboardNumericModule } from 'src/app/shared/components/keyboard/numeric/keyboard-numeric.module';
import { KeyboardAlphabetModule } from 'src/app/shared/components/keyboard/alphabet/keyboard-alphabet.module';

@NgModule({
  declarations: [FramingComponent],
  imports: [
    CommonModule,
    FramingRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    IconsModule,
    ButtonModule,
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    SelectionPopupModule,
    FacetingSandingPopupModule,
    KeyboardNumericModule,
    KeyboardAlphabetModule,
  ],
  exports: [FramingComponent],
})
export class FramingModule {}
