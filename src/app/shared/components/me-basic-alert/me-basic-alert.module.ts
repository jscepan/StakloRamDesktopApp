import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../../modules/icons.module';

import { MeBasicAlertComponent } from './me-basic-alert.component';
import { MeBasicAlertService } from './me-basic-alert.service';
@NgModule({
  imports: [CommonModule, IconsModule, RouterModule, MatSnackBarModule],
  exports: [MeBasicAlertComponent],
  declarations: [MeBasicAlertComponent],
  providers: [MeBasicAlertService]
})
export class MeBasicAlertModule {}
