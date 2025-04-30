import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { LanguageStringsService } from 'ngx-bimplus-components';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    LanguageStringsService,
    provideRouter(routes),
    ...Object.values(appConfig.providers), // Ensure this is an array
  ],
}).catch(err => console.error(err));

