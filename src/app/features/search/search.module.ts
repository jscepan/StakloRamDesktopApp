import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TableShowModule } from 'src/app/shared/components/table-show/table-show.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    ButtonModule,
    TranslateModule,
    TableShowModule,
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent],
})
export class SearchModule {}
