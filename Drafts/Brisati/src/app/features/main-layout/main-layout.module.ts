import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MeBasicAlertModule } from 'src/app/shared/components/me-basic-alert/me-basic-alert.module';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { GlobalService } from 'src/app/shared/services/global.service';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    SidebarModule,
    MeBasicAlertModule,
  ],
  providers: [GlobalService, MatSnackBar, MatSnackBarConfig],
})
export class MainLayoutModule {}
