import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { FrameInputPopupComponent } from './frame-input-popup.component';
import { IconsModule } from 'src/app/shared/modules/icons.module';

@NgModule({
  declarations: [FrameInputPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonModule,
    TranslateModule,
    IconsModule,
  ],
  exports: [FrameInputPopupComponent],
  entryComponents: [FrameInputPopupComponent],
})
export class FrameInputPopupModule {}
