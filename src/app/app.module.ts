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
import { FrameDataStoreService } from './shared/services/data-services/frame-data-store.service';
import { FacetingDataStoreService } from './shared/services/data-services/faceting-data-store.service';
import { GlassDataStoreService } from './shared/services/data-services/glass-data-store.service';
import { GlassWidthDataStoreService } from './shared/services/data-services/glass-width-data-store.service';
import { PasspartuColorDataStoreService } from './shared/services/data-services/passpartu-color-data-store.service';
import { PasspartuDataStoreService } from './shared/services/data-services/passpartu-data-store.service';
import { SandingDataStoreService } from './shared/services/data-services/sanding-data-store.service';

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
    FrameDataStoreService,
    GlassDataStoreService,
    PasspartuDataStoreService,
    PasspartuColorDataStoreService,
    GlassWidthDataStoreService,
    FacetingDataStoreService,
    SandingDataStoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
