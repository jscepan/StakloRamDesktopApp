import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExperimentsModule } from './features/experiments/experiments.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, ExperimentsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
