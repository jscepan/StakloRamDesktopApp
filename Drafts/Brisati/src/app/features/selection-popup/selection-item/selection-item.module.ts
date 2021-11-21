import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionItemComponent } from './selection-item.component';
import { IconsModule } from 'src/app/shared/modules/icons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SelectionItemComponent],
  imports: [CommonModule, IconsModule, MatCheckboxModule, TranslateModule],
  exports: [SelectionItemComponent],
})
export class SelectionItemModule {}
