import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { PasspartuRoutingModule } from './passpartu-routing.module';
import { PasspartuComponent } from './passpartu.component';

@NgModule({
  imports: [CommonModule, ButtonModule, PasspartuRoutingModule],
  exports: [PasspartuComponent],
  declarations: [PasspartuComponent],
})
export class PasspartuModule {}
