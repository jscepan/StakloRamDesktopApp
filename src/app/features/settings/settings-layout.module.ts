import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { SettingsLayoutComponent } from './settings-layout.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [SettingsLayoutComponent],
  declarations: [SettingsLayoutComponent],
})
export class SettingsLayoutModule {}
