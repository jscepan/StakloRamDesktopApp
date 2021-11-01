import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { AppSettingsComponent } from './app-settings.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [AppSettingsComponent],
  declarations: [AppSettingsComponent],
})
export class AppSettingsModule {}
