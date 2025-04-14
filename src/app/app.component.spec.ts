import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore
} from '@ngx-translate/core';
import { TestSpyHelper } from 'src/testSpyUtils';
import {
  BimplusNavbarComponent,
  BimplusUserMenuComponent,
  BimplusLanguageMenuComponent,
  BimplusTouchMenuComponent,
  BimplusContactComponent,
  LanguageStringsService,
  LocalizedStrings,
} from 'ngx-bimplus-components';

describe('AppComponent', () => {

  let translateLoaderSpy: jasmine.SpyObj<TranslateLoader>;
  let translateCompilerSpy: jasmine.SpyObj<TranslateCompiler>;
  let translateParserSpy: jasmine.SpyObj<TranslateParser>;
  let mockLanguageStringsService: jasmine.SpyObj<LanguageStringsService>;

  beforeEach(async () => {

    mockLanguageStringsService = jasmine.createSpyObj('LanguageStringsService', [
      'currentLanguage$',
      'currentLanguageStrings$',
      'setCurrentLanguage',
    ]);
    // Mock BehaviorSubjects with correct types
    const mockLocalizedStrings: LocalizedStrings = {
      'hello': 'Hello',
      'welcome': 'Welcome'
    };
    // Mock the observables
    mockLanguageStringsService.currentLanguage$ = new BehaviorSubject<string>('en'); // Mock currentLanguage$ with a BehaviorSubject
    mockLanguageStringsService.currentLanguageStrings$ = new BehaviorSubject<LocalizedStrings>(mockLocalizedStrings); // Mock currentLanguageStrings$ with a BehaviorSubject
    mockLanguageStringsService.setCurrentLanguage.and.stub();

    translateLoaderSpy = TestSpyHelper.getTranslateLoader();
    translateCompilerSpy = TestSpyHelper.getTranslateCompiler();
    translateParserSpy = TestSpyHelper.getTranslateParser();

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BimplusNavbarComponent,
        BimplusUserMenuComponent,
        BimplusLanguageMenuComponent,
        BimplusTouchMenuComponent,
        BimplusContactComponent,
        BimplusLanguageMenuComponent,
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useValue: translateLoaderSpy },
          compiler: { provide: TranslateCompiler, useValue: translateCompilerSpy },
          parser: { provide: TranslateParser, useValue: translateParserSpy }
        }),
      ],
      providers: [
        TranslateService,
        TranslateStore,
        { provide: LanguageStringsService, useValue: mockLanguageStringsService },

      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should have isMainMenuVisible as false by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app.isMainMenuVisible).toBeTrue();
  });
});
