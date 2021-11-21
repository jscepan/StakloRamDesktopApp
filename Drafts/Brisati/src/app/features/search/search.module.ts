import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, ButtonModule, TranslateModule],
  exports: [SearchComponent],
  declarations: [SearchComponent],
})
export class SearchModule {}
