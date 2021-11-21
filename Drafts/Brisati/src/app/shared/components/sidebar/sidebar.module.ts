import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, ButtonModule, TranslateModule],
  exports: [SidebarComponent],
  declarations: [SidebarComponent],
})
export class SidebarModule {}
