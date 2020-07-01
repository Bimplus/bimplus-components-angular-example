How to integrate Bimplus components into Angular webpage.


- install Bimplus components via npm 
  npm i bimplus-components --save-dev
  
- in app.module.ts include CUSTOM_ELEMENTS_SCHEMA
    
    import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
    
    @NgModule({
        .......,
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    
- in index.html file include bimplus-components main file in <head> tag
    
  <script src='assets/bimplus-components/bimplus.js'></script>
  
- in angular.json copy required assets from npm package to assets folder of the page 

"assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "./node_modules/bimplus-components/dist/assets",
                "output": "./assets"
              },
              {
                "glob": "**/*",
                "input": "./node_modules/bimplus-components/dist/bimplus-components",
                "output": "./assets/bimplus-components"
              }
            ],
            
- you can use bimplus components tag anywhere in any html file e.g. 
<bimplus-main-menu 
  [attr.selected-language]="selectedLanguage"
  [attr.is-touch] = "isTouchMode"
  (bimplusMainMenuClicked) = "onBimplusMainMenuClicked($event)"
>
</bimplus-main-menu>

- you can set attributes of the components and also you can listen to custom events without any additional code
