import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { appConfig, BimplusMissingTranslationHandler } from './app.config';

describe('BimplusMissingTranslationHandler', () => {
  let missingTranslationHandler: BimplusMissingTranslationHandler;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        TranslateService,
        BimplusMissingTranslationHandler
      ],
    }).compileComponents();

    missingTranslationHandler = TestBed.inject(BimplusMissingTranslationHandler);
    translateService = TestBed.inject(TranslateService);
  });

  it('should handle missing translations', () => {
    const params: MissingTranslationHandlerParams = {
      key: 'missing.key',
      translateService: translateService
    };

    const result = missingTranslationHandler.handle(params);

    expect(result).toBe('missing.key');
  });
});

describe('appConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ]
    });
  });

  it('should be defined', () => {
    expect(appConfig).toBeDefined();
  });
});