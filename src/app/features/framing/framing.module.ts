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

@NgModule({
  declarations: [FramingComponent],
  imports: [
    CommonModule,
    FramingRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    // MatTabsModule,
    IconsModule,
    ButtonModule,
    DimensionsModule,
    FramesModule,
    InvoiceModule,
    TranslateModule,
  ],
  exports: [FramingComponent],
})
export class FramingModule {}
