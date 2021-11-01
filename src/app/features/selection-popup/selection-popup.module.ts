import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
// import { TranslateModule } from '@ngx-translate/core';
import { SelectionPopupComponent } from '@features/selection-popup/selection-popup.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';

@NgModule({
  declarations: [SelectionPopupComponent],
  imports: [CommonModule, MatDialogModule, ButtonModule], //TranslateModule
  exports: [SelectionPopupComponent],
  entryComponents: [SelectionPopupComponent],
})
export class CollectionsSelectionPopupModule {}
