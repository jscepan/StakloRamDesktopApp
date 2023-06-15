import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { KeyboardNumericComponent } from './keyboard-numeric.component';

@NgModule({
    declarations: [KeyboardNumericComponent],
    imports: [
        CommonModule,
        ButtonModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    exports: [KeyboardNumericComponent]
})
export class KeyboardNumericModule {}
