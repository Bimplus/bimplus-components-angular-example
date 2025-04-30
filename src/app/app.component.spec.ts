import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import {
  BimplusNavbarComponent,
  BimplusUserMenuComponent,
  BimplusMainMenuComponent,
  BimplusLanguageMenuComponent,
  BimplusTouchMenuComponent,
  BimplusContactComponent,
  LanguageStringsService,
  LocalizedStrings,
  MenuItemEventData,
  BimplusOverlayDialogErrorComponent,
  BimplusOverlayDialogConfirmComponent,
  BimplusOverlayDialogWarningComponent,
  BimplusOverlayDialogDeleteComponent,
} from 'ngx-bimplus-components';
import { TestSpyHelper } from 'src/test/testSpyUtils';
import { UnknownObject } from 'src/testSpyUtils';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
        BimplusContactComponent,
        BimplusLanguageMenuComponent,
        BimplusNavbarComponent,
        BimplusTouchMenuComponent,
        BimplusUserMenuComponent,
        BimplusMainMenuComponent,
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

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'getBaseHref').and.returnValue('/base');
    spyOn(localStorage, 'setItem');
  });

  describe('app startup', () => {
    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      fixture.detectChanges();

      expect(app).toBeTruthy();
    });
  });

  describe('main menu', () => {
    it('should have isMainMenuVisible as false by default', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      fixture.detectChanges();

      expect(app.isMainMenuVisible).toBeTrue();
    });
  });

  describe('switchLanguage', () => {
    it('should set default to "en" if lang is falsy', async () => {
      await component.switchLanguage('');

      expect(component.getBaseHref).toHaveBeenCalledWith();
      expect(mockLanguageStringsService.languageFilesUri).toBe('/base/assets');
      expect(mockLanguageStringsService.setCurrentLanguage).toHaveBeenCalledWith('en');
      expect(localStorage.setItem).toHaveBeenCalledWith('language', 'en');
    });

    it('should use provided language if truthy', async () => {
      await component.switchLanguage('de');

      expect(mockLanguageStringsService.setCurrentLanguage).toHaveBeenCalledWith('de');
      expect(localStorage.setItem).toHaveBeenCalledWith('language', 'de');
    });
  });

  describe('onBimplusLanguageSelected', () => {
    it('should call switchLanguage and alert', () => {
      spyOn(component, 'switchLanguage').and.callFake(() => Promise.resolve());
      spyOn(window, 'alert');

      component.onBimplusLanguageSelected('fr');

      expect(component.switchLanguage).toHaveBeenCalledWith('fr');
      expect(window.alert).toHaveBeenCalledWith('Language selected : fr');
    });
  });

  describe('touch handling', () => {
    it('should set touchMode and isTouchMode when touch is selected', () => {
      const event: string = 'touch';

      spyOn(window, 'alert');
      component.onBimplusTouchModeSelected(event);

      expect(component.touchMode).toBe('touch');
      expect(component.isTouchMode).toBeTrue();
      expect(window.alert).toHaveBeenCalledWith('Touch mode : touch');
    });

    it('should set isTouchMode to false when mouse is selected', () => {
      const event: string = 'mouse';

      spyOn(window, 'alert');
      component.onBimplusTouchModeSelected(event);

      expect(component.touchMode).toBe('mouse');
      expect(component.isTouchMode).toBeFalse();
      expect(window.alert).toHaveBeenCalledWith('Touch mode : mouse');
    });
  });

  describe('navbar click handling', () => {
    it('should toggle isMainMenuVisible when actionType is "menu"', () => {
      component.isMainMenuVisible = false;

      component.onBimplusNavbarClicked('menu');

      expect(component.isMainMenuVisible).toBeTrue();

      component.onBimplusNavbarClicked('menu');

      expect(component.isMainMenuVisible).toBeFalse();
    });

    it('should alert on unknown actionType', () => {
      spyOn(window, 'alert');

      component.onBimplusNavbarClicked('something-else');

      expect(window.alert).toHaveBeenCalledWith('Navbar clicked. Clicked on: something-else');
    });
  });

  describe('user menu click handling', () => {
    it('should alert detail info for user menu', () => {
      spyOn(window, 'alert');

      const mockEvent = {
        index: 2,
        action: 'logout',
      } as MenuItemEventData;

      component.onBimplusUserMenuClicked(mockEvent);

      expect(window.alert).toHaveBeenCalledWith(
        'EVENT : bimplusUserMenuClicked. INDEX: 2 ACTION: logout'
      );
    });

    it('should alert "Event undefined" for main menu when detail is missing', () => {
      spyOn(window, 'alert');

      const mockEvent = null as unknown as MenuItemEventData; // No detail

      component.onBimplusUserMenuClicked(mockEvent);

      expect(window.alert).toHaveBeenCalledWith(
        'EVENT : bimplusUserMenuClicked. Event undefined'
      );
    });
  });

  describe('main menu click handling', () => {

    it('should toggle isViewerAppVisible when event.action is "bimexplorer"', () => {
      component.isViewerAppVisible = false; // start from false

      const event = { action: 'bimexplorer' };

      component.onBimplusMainMenuClicked(event);

      expect(component.isViewerAppVisible).toBeTrue(); // should now be true

      component.onBimplusMainMenuClicked(event);

      expect(component.isViewerAppVisible).toBeFalse(); // toggles back to false
    });

    it('should alert detail info for main menu', () => {
      spyOn(window, 'alert');

      const mockEvent = {
        action: 'openProject',
        type: 'navigation',
      } as UnknownObject; // Mocking as UnknownObject

      component.onBimplusMainMenuClicked(mockEvent);

      expect(window.alert).toHaveBeenCalledWith(
        'EVENT : bimplusMainMenuClicked. ACTION: openProject TYPE: navigation'
      );
    });

    it('should alert "Event undefined" for user menu when detail is missing', () => {
      spyOn(window, 'alert');

      const mockEvent = null as unknown as UnknownObject; // No detail

      component.onBimplusMainMenuClicked(mockEvent);

      expect(window.alert).toHaveBeenCalledWith(
        'EVENT : bimplusMainMenuClicked. Event undefined'
      );
    });
  });

  describe('messages', () => {
    it('should open BimplusOverlayDialogErrorComponent with correct data when handleErrorClick is called', () => {
      spyOn(component['dialogService'], 'open');

      component.handleErrorClick();

      expect(component['dialogService'].open).toHaveBeenCalledWith(BimplusOverlayDialogErrorComponent, {
        options: component.dialogOptions,
        data: { title: "Error", message: component.message }
      });

      component.handleWarningClick();

      expect(component['dialogService'].open).toHaveBeenCalledWith(BimplusOverlayDialogWarningComponent, {
        options: component.dialogOptions,
        data: { title: "Warning", message: component.message }
      });

      component.handleConfirmClick();

      expect(component['dialogService'].open).toHaveBeenCalledWith(BimplusOverlayDialogConfirmComponent, {
        options: component.dialogOptions,
        data: { title: "Confirm", message: component.message }
      });

      component.handleDeleteClick();

      expect(component['dialogService'].open).toHaveBeenCalledWith(BimplusOverlayDialogDeleteComponent, {
        options: component.dialogOptions,
        data: { title: "Delete", message: component.message }
      });
    });
  });

});
