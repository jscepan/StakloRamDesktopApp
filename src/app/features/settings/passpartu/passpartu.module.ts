import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { PasspartuComponent } from './passpartu.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [PasspartuComponent],
  declarations: [PasspartuComponent],
})
export class PasspartuModule {}
