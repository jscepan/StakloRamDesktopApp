import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MeSweetAlertComponent } from './me-sweet-alert.component';
import { MeSweetAlertService } from './me-sweet-alert.service';
import { IconsModule } from '../../modules/icons.module';
// import { MeButtonModule } from '../me-button/me-button.module';
// import { SafePipeModule } from '../../modules/safe-pipe.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from '../button/button.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    ButtonModule,
    TranslateModule,
    MatTooltipModule,
  ],
  declarations: [MeSweetAlertComponent],
  exports: [MeSweetAlertComponent],
  providers: [MeSweetAlertService],
})
export class MeSweetAlertModule {}
