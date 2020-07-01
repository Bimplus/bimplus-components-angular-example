import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isTouchMode = false;
  touchMode = "desktop";
  selectedLanguage = 'en';  
  isMainMenuVisible = true;

  /**--------------------------------------------------------------------------
  * changed language event
  --------------------------------------------------------------------------*/
  onBimplusLanguageSelected(event){
    let newLang = event.detail;
    this.selectedLanguage = newLang;
    alert(`Language selected : ${newLang}`);
  }

  /**--------------------------------------------------------------------------
  * touch mode selected
  --------------------------------------------------------------------------*/
  onBimplusTouchModeSelected(event){
    let touchMode = event.detail;
    this.isTouchMode = touchMode === "touch";
    alert(`Touch mode : ${touchMode}`);
    this.touchMode = touchMode;
  }

  /**--------------------------------------------------------------------------
  * bimplus navbar clicked handler
  --------------------------------------------------------------------------*/
  onBimplusNavbarClicked(event) {
    // alert(`Navbar clicked. Clicked on: ${event.detail}`)

    if (event.detail === 'menu'){
      this.isMainMenuVisible = !this.isMainMenuVisible;
    } 
  }

  /**--------------------------------------------------------------------------
  * on Bimplus Storage Info Clicked
  --------------------------------------------------------------------------*/
  onBimplusStorageInfoClicked(){
    alert(`Storage info clicked.`);
  }


  /**--------------------------------------------------------------------------
  * on Bimplus User Menu Clicked
  --------------------------------------------------------------------------*/
  onBimplusUserMenuClicked(event){
    alert(`EVENT : bimplusUserMenuClicked. INDEX: ${event.detail.index} ACTION: ${event.detail.action}`);
  }

  /**--------------------------------------------------------------------------
  * on Bimplus Main Menu Clicked 
  --------------------------------------------------------------------------*/
  onBimplusMainMenuClicked(event){
    alert(`EVENT : bimplusMainMenuClicked. ACTION: ${event.detail.action} TYPE: ${event.detail.type}`);
  }
}
