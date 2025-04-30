import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  BimplusContactComponent,
  BimplusLanguageMenuComponent,
  BimplusMainMenuComponent,
  BimplusNavbarComponent,
  BimplusOverlayDialogConfirmComponent,
  BimplusOverlayDialogDeleteComponent,
  BimplusOverlayDialogErrorComponent,
  BimplusOverlayDialogWarningComponent,
  BimplusTouchMenuComponent,
  BimplusUserMenuComponent,
  DialogService,
  LanguageStringsService,
  LocalizedStrings,
  MenuItemEventData,
} from 'ngx-bimplus-components';
import { UnknownObject } from 'src/interfaces/unknown.object.interface';
import { ViewerComponent } from './viewer/viewer.component';
import { IDialogOptions } from 'ngx-bimplus-components/lib/components/bimplus-general-overlay-dialog/bimplus-general-dialog-config-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [
    ViewerComponent
  ],
  imports: [
    BimplusContactComponent,
    BimplusLanguageMenuComponent,
    BimplusNavbarComponent,
    BimplusTouchMenuComponent,
    BimplusUserMenuComponent,
    BimplusMainMenuComponent,
    ViewerComponent,
    CommonModule
  ],
})
export class AppComponent implements OnInit {
  isTouchMode = false;
  touchMode = 'desktop';
  isMainMenuVisible = true;
  currentLanguage = "";
  localizedStrings: LocalizedStrings = {};
  isViewerAppVisible = false;
  isWarningDialogVisible = false;

  constructor(
    private readonly dialogService: DialogService,
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

  ngOnInit(): void {
    this.addEventListenerForMessages();
  }

  // get base href from index.html
  getBaseHref(): string {
    return this.document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '') ?? '';
  }

  // setup selected or use default language
  async switchLanguage(lang: string) {
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
  onBimplusLanguageSelected(lang: string) {
    this.switchLanguage(lang);
    alert(`Language selected : ${lang}`);
  }

  /**--------------------------------------------------------------------------
  * touch mode selected
  --------------------------------------------------------------------------*/
  onBimplusTouchModeSelected(touchMode: string) {
    this.isTouchMode = touchMode === 'touch';
    alert(`Touch mode : ${touchMode}`);
    this.touchMode = touchMode;
  }

  /**--------------------------------------------------------------------------
  * bimplus navbar clicked handler
  --------------------------------------------------------------------------*/
  onBimplusNavbarClicked(actionType: string) {
    switch (actionType) {
      case "menu":
        this.isMainMenuVisible = !this.isMainMenuVisible;
        break;

      default:
        alert(`Navbar clicked. Clicked on: ${actionType}`);
        break;
    }
  }

  /**--------------------------------------------------------------------------
  * on Bimplus User Menu Clicked
  --------------------------------------------------------------------------*/
  onBimplusUserMenuClicked(event: MenuItemEventData) {
    if (event) {
      alert(`EVENT : bimplusUserMenuClicked. INDEX: ${event.index} ACTION: ${event.action}`);
    } else {
      alert(`EVENT : bimplusUserMenuClicked. Event undefined`);
    }
  }

  /**--------------------------------------------------------------------------
  * on Bimplus Main Menu Clicked
  --------------------------------------------------------------------------*/
  onBimplusMainMenuClicked(event: UnknownObject) {

    if (event) {
      switch (event.action) {
        case "bimexplorer":
          this.isViewerAppVisible = !this.isViewerAppVisible;
          break;
        default:
          alert(`EVENT : bimplusMainMenuClicked. ACTION: ${event.action} TYPE: ${event.type}`);
          break;
      }
    } else {
      alert(`EVENT : bimplusMainMenuClicked. Event undefined`);
    }
  }

  updateCurrentLanguage() {
    this.currentLanguage = this.languageStringsService.currentLanguage;
  }

  updateLocalizedStrings() {
    this.localizedStrings = this.languageStringsService.currentLanguageStrings;
  }

  //#region Messages
  @ViewChild('errorButton', { static: true }) errorButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('warningButton', { static: true }) warningButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('confirmButton', { static: true }) confirmButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('deleteButton', { static: true }) deleteButton!: ElementRef<HTMLButtonElement>;

  readonly dialogOptions = {
    position: 'middle',
    positionOptions: {},
    overlayClickEnabled: false,
    overlayVisibilityEnabled: true,
    draggable: true
  } as IDialogOptions;

  readonly message = "This is a message.";

  addEventListenerForMessages() {
    this.errorButton.nativeElement.addEventListener('click', this.handleErrorClick);
    this.warningButton.nativeElement.addEventListener('click', this.handleWarningClick);
    this.confirmButton.nativeElement.addEventListener('click', this.handleConfirmClick);
    this.deleteButton.nativeElement.addEventListener('click', this.handleDeleteClick);
  }

  handleErrorClick = () => {
    this.dialogService.open(BimplusOverlayDialogErrorComponent, {
      options: this.dialogOptions,
      data: { title: "Error", message: this.message }
    });
  }

  handleWarningClick = () => {
    this.dialogService.open(BimplusOverlayDialogWarningComponent, {
      options: this.dialogOptions,
      data: { title: "Warning", message: this.message }
    });
  }

  handleConfirmClick = () => {
    this.dialogService.open(BimplusOverlayDialogConfirmComponent, {
      options: this.dialogOptions,
      data: { title: "Confirm", message: this.message }
    });
  }

  handleDeleteClick = () => {
    this.dialogService.open(BimplusOverlayDialogDeleteComponent, {
      options: this.dialogOptions,
      data: { title: "Delete", message: this.message }
    });
  }


  //#endregion
}
