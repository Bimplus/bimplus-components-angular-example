import { Component, Inject } from '@angular/core';
import { BimplusContactComponent, BimplusLanguageMenuComponent, BimplusNavbarComponent, BimplusTouchMenuComponent, BimplusUserMenuComponent, LanguageStringsService, LocalizedStrings } from 'ngx-bimplus-components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [],
    imports: [
      BimplusContactComponent,
      BimplusLanguageMenuComponent,
      BimplusNavbarComponent,
      BimplusTouchMenuComponent,
      BimplusUserMenuComponent,
      CommonModule
    ],
})
export class AppComponent {
  isTouchMode = false;
  touchMode = 'desktop';
  isMainMenuVisible = true;
  currentLanguage = "";
  localizedStrings: LocalizedStrings = {};

  constructor(
    public languageStringsService: LanguageStringsService,
    public translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.switchLanguage("en");
    this.languageStringsService.currentLanguage$.pipe(takeUntilDestroyed()).subscribe({
      next: (language: string) => {
        this.updateCurrentLanguage();
        this.translateService.use(language);
      }
    });

    this.languageStringsService.currentLanguageStrings$.pipe(takeUntilDestroyed()).subscribe({
      next: (strings: object) => {
        this.updateLocalizedStrings();
        this.translateService.setTranslation(this.languageStringsService.currentLanguage, strings);
      }
    });
  }

  // get base href from index.html
  getBaseHref(): string {
    return this.document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '') ?? '';
  }

  // setup selected or use default language
  async switchLanguage(lang : string) {
    if (!lang) {
      lang = 'en';
    }
    // check if base href is used and alternate language files uri
    const baseHref = this.getBaseHref();
    const languageFilesUri = baseHref + '/assets';
    if (baseHref !== '' && languageFilesUri !== this.languageStringsService.languageFilesUri) {
      this.languageStringsService.languageFilesUri = languageFilesUri;
    }
    await this.languageStringsService.setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  }

  /**--------------------------------------------------------------------------
  * changed language event
  --------------------------------------------------------------------------*/
  onBimplusLanguageSelected(lang) {
    this.switchLanguage(lang);
    alert(`Language selected : ${lang}`);
  }

  /**--------------------------------------------------------------------------
  * touch mode selected
  --------------------------------------------------------------------------*/
  onBimplusTouchModeSelected(event) {
    const touchMode = event.detail;
    this.isTouchMode = touchMode === 'touch';
    alert(`Touch mode : ${touchMode}`);
    this.touchMode = touchMode;
  }

  /**--------------------------------------------------------------------------
  * bimplus navbar clicked handler
  --------------------------------------------------------------------------*/
  onBimplusNavbarClicked(actionType) {
    switch (actionType) {
      case "menu" :
        this.isMainMenuVisible = !this.isMainMenuVisible;
        break;

      default :
        alert(`Navbar clicked. Clicked on: ${actionType}`);
        break;
    }
  }

  /**--------------------------------------------------------------------------
  * on Bimplus User Menu Clicked
  --------------------------------------------------------------------------*/
  onBimplusUserMenuClicked(event) {
    alert(`EVENT : bimplusUserMenuClicked. INDEX: ${event.detail.index} ACTION: ${event.detail.action}`);
  }

  /**--------------------------------------------------------------------------
  * on Bimplus Main Menu Clicked
  --------------------------------------------------------------------------*/
  onBimplusMainMenuClicked(event) {
    alert(`EVENT : bimplusMainMenuClicked. ACTION: ${event.detail.action} TYPE: ${event.detail.type}`);
  }

  updateCurrentLanguage() {
    this.currentLanguage = this.languageStringsService.currentLanguage;
  }

  updateLocalizedStrings() {
    this.localizedStrings = this.languageStringsService.currentLanguageStrings;
  }
}
