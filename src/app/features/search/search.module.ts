import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [SearchComponent],
  declarations: [SearchComponent],
})
export class SearchModule {}
