import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ConnectionDesignerComponent } from './../connection-designer/connection-designer.component';
import {
  BimplusSidenavComponent,
  LanguageStringsService,
  SidenavItem,
  BimplusObjectNavigatorComponent,
  BimplusContextMenuItem,
} from 'ngx-bimplus-components';
import { ModuleObjectNavigatorService } from './module-object-navigator.service';

@Component({
  selector: 'app-left-sidenav',
  imports: [
    BimplusSidenavComponent,
    ConnectionDesignerComponent,
    BimplusObjectNavigatorComponent,
    CommonModule,
  ],
  templateUrl: './left-sidenav.component.html',
  styleUrl: './left-sidenav.component.less',
})
export class LeftSidenavComponent implements OnInit {
  languageStringsService = inject(LanguageStringsService);
  objectNavigatorService = inject(ModuleObjectNavigatorService);


  ngOnInit() {
    this.setSidenavItems();
    this.activeSidenavItemChanged(this.sidenavActionItems?.[0]?.id);
  }

  @Input() projectId = '';

  activeSidenavItem: string = "";
  sidenavItems: Array<SidenavItem> = Array<SidenavItem>();

  setSidenavItems() {
    this.sidenavItems = [
      {
        id: "ObjectNavigator",
        icon: "assets/ObjectManager_20_white.svg",
        iconActive: "assets/ObjectManager_20_maincolor.svg",
        iconDisabled: "assets/ObjectManager_20_disabled.svg",
        text: "_Object navigator"
      },
      {
        id: "DesignConnections",
        icon: "assets/ConnectionDesigner_white.svg",
        iconActive: "assets/ConnectionDesigner_maincolor.svg",
        iconDisabled: "assets/ConnectionDesigner_disabled.svg",
        text: "_Connection_designer",
        disabled: false,
      }
    ];
  }

  sidenavActionItems: Array<SidenavItem> = [];

  activeSidenavItemChanged(item: string) {
    this.activeSidenavItem = item;
  }

  sidenavActionClicked(item: string) {
    alert("Clicked navbar action: " + item);
  }

  sidenavFooterClicked(item: string) {
    alert("Clicked sidenav footer: " + item);
  }

  hideFilterContextMenu: boolean = false;

  filterContextMenu: Array<BimplusContextMenuItem> = Array<BimplusContextMenuItem>(
    {
      id: "saveAs",
      title: "Save as",
      icon: "assets/Add_filter_18_gray.svg",
      tooltip: "Save as",
      disabled: (data: object | undefined) => {
        console.debug("saveAs - disabled", data)
        return false;
      },
      action: (data: object | undefined) => {
        console.debug("saveAs - action", data)
        alert("Click on the context menu item: Save as");
      }
    },
    {
      id: "renameFilter",
      title: "Rename filter",
      icon: "assets/Edit_18_gray.svg",
      tooltip: "Rename filter",
      disabled: (data: object | undefined) => {
        console.debug("renameFilter - disabled", data)
        return false;
      },
      action: (data: object | undefined) => {
        console.debug("renameFilter - action", data)
        alert("Click on the context menu item: Rename filter");
      }
    },
    {
      id: "deleteFilter",
      title: "Delete",
      icon: "assets/Trash_18_gray.svg",
      tooltip: "Delete",
      disabled: (data: object | undefined) => {
        console.debug("deleteFilter - disabled", data)
        return false;
      },
      action: (data: object | undefined) => {
        console.debug("deleteFilter - action", data)
        alert("Click on the context menu item: Delete");
      }
    }
  );

}
