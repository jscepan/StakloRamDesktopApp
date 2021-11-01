import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { MatButtonModule } from '@angular/material/button';
import { IconsModule } from '../../modules/icons.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, MatButtonModule, IconsModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
