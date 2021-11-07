import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FramingRoutingModule } from './framing-routing.module';
import { FramingComponent } from './framing.component';
// import { MatTabsModule } from '@angular/material/tabs';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { DimensionsModule } from './dimensions/dimensions.module';
import { FramesModule } from './frames/frames.module';
import { InvoiceModule } from './invoice/invoice.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatStepperModule } from '@angular/material/stepper';
import { IconsModule } from 'src/app/shared/modules/icons.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [FramingComponent],
  imports: [
    CommonModule,
    FramingRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    IconsModule,
    ButtonModule,
    DimensionsModule,
    FramesModule,
    InvoiceModule,
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [FramingComponent],
})
export class FramingModule {}
