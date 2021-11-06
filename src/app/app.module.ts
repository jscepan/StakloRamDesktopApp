import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExperimentsModule } from './features/experiments/experiments.module';
import { AppSettingsService } from './shared/services/app-settings.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './language.service';
import { FrameDataService } from './shared/services/data-services/frame-data.service';
import { FacetingDataService } from './shared/services/data-services/faceting-data.service';
import { GlassDataService } from './shared/services/data-services/glass-data.service';
import { GlassWidthDataService } from './shared/services/data-services/glass-width-data.service';
import { PasspartuColorDataService } from './shared/services/data-services/passpartu-color-data.service';
import { PasspartuDataService } from './shared/services/data-services/passpartu-data.service';
import { SandingDataService } from './shared/services/data-services/sanding-data.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    ExperimentsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
  providers: [
    AppSettingsService,
    LanguageService,
    FrameDataService,
    GlassDataService,
    PasspartuDataService,
    PasspartuColorDataService,
    GlassWidthDataService,
    FacetingDataService,
    SandingDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
