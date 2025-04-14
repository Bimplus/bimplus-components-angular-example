import { TranslateLoader, TranslateParser, TranslateCompiler } from '@ngx-translate/core';
import { of } from 'rxjs';

export interface UnknownObject {
  [key: string]: unknown;
}

export class TestSpyHelper {

  // Create a SpyObj<TranslateLoader> with the getTranslation method
  static getTranslateLoader(): jasmine.SpyObj<TranslateLoader> {
    return {
      getTranslation: jasmine.createSpy('getTranslation').and.callFake(() => {
        return of({});
      })
    } as jasmine.SpyObj<TranslateLoader>;
  }

  // Create a SpyObj<TranslateCompiler> with the compile and compileTranslations methods
  static getTranslateCompiler (): jasmine.SpyObj<TranslateCompiler> {
    return {
      compile: jasmine.createSpy('compile').and.callFake((value: string) => value),
      compileTranslations: jasmine.createSpy('compileTranslations').and.callFake((translations: unknown) => translations)
    } as jasmine.SpyObj<TranslateCompiler>;
  }

  // Create a SpyObj<TranslateParser> with the interpolate and getValue methods
  static getTranslateParser (): jasmine.SpyObj<TranslateParser> {
    return {
      interpolate: jasmine.createSpy('interpolate').and.callFake((expr: string) => expr),
      getValue: jasmine.createSpy('getValue').and.callFake((target: UnknownObject, key: string) => target[key])
    } as jasmine.SpyObj<TranslateParser>;
  }

}