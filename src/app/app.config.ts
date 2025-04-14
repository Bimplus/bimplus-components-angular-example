import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {TranslateModule, MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class BimplusMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
      console.warn("Missing translation string " + params.key);
      return params.key;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
    TranslateModule.forRoot({
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: BimplusMissingTranslationHandler},
      isolate : true
    }))
  ]
};
