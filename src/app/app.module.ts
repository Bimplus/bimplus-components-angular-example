import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import {
  BimplusNavbarComponent,
  BimplusNotifyComponent,
  BimplusContactComponent,
  BimplusUserMenuComponent,
  BimplusLanguageMenuComponent,
  BimplusLocalizedWidgetComponent,
  BimplusMainMenuComponent,
  LanguageStringsService
} from 'ngx-bimplus-components';
@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    BimplusNavbarComponent,
    BimplusNotifyComponent,
    BimplusContactComponent,
    BimplusUserMenuComponent,
    BimplusLanguageMenuComponent,
    BimplusLocalizedWidgetComponent,
    BimplusMainMenuComponent
  ],
  providers: [
    appConfig.providers, // Add appConfig providers here

    LanguageStringsService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
