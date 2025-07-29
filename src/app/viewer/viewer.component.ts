
import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ElementRef, DOCUMENT, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FloatingBarItem,
  BimplusFloatingBarHideObjectsComponent,
  BimplusFloatingBarIsolationObjectsComponent,
  BimplusFloatingBarProjectNavigatorComponent,
  BimplusToolHubComponent,
  LanguageStringsService,
  ProjectNavigatorLayer,
  ProjectNavigatorModel,
  ProjectNavigatorProject,
  ToolHubItemStates,
  ResizeObserverService
} from 'ngx-bimplus-components';
import { LeftSidenavComponent } from './../left-sidenav/left-sidenav.component';

@Component({
  selector: 'app-viewer',
  imports: [
    LeftSidenavComponent,
    BimplusFloatingBarHideObjectsComponent,
    BimplusFloatingBarIsolationObjectsComponent,
    BimplusFloatingBarProjectNavigatorComponent,
    BimplusToolHubComponent,
  ],
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.less'],
})
export class ViewerComponent implements OnInit, AfterViewInit {
  private readonly document = inject<Document>(DOCUMENT);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  languageStringsService = inject(LanguageStringsService);
  resizeObserverService = inject(ResizeObserverService);
  private readonly element = inject(ElementRef);


  // Use HostListener to listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    alert(`Window resized!\nEvent: ${JSON.stringify(event, null, 2)}`); }

  constructor() {
    this.project.models = this.getModels(this.project);
  }

  projectId: string = '';
  projectName: string = '';
  teamId: string = '';
  wormholeSelector = 'connexisWormholeId';
  env: string = '';
  objectId: string | undefined = undefined;
  revision: number | undefined = undefined; //use only for object scene
  inputBaseUrl: string = '';

  isFloatingBarProjectNavigatorVisible = true; // per default true in tool hub
  isFloatingBarHideObjectsVisible = false;
  isFloatingBarIsolationObjectsVisible = false;

  @ViewChild(BimplusToolHubComponent) toolHubComponent: BimplusToolHubComponent | null = null;
  @ViewChild(BimplusFloatingBarHideObjectsComponent) hideObjectsFloatingBarComponent: BimplusFloatingBarHideObjectsComponent | null = null;
  @ViewChild(BimplusFloatingBarIsolationObjectsComponent) isolationObjectsFloatingBarComponent: BimplusFloatingBarIsolationObjectsComponent | null = null;
  @ViewChild(BimplusFloatingBarProjectNavigatorComponent) projectNavigatorComponent: BimplusFloatingBarProjectNavigatorComponent | null = null;

  ngOnInit() {
    console.debug("ViewerComponent ngOnInit() called");
  }

  ngAfterViewInit() {
    console.debug("ViewerComponent ngAfterViewInit() called");
  }

  // #region Tool hub handling

  // All states are false by default
  // Set the project navigation bar to active so it will be shown
  // Set the disabled state for usable floating bars to false
  itemStates: Array<ToolHubItemStates> = [
    { buttonId: 'cmButProjectNavigator', active: this.isFloatingBarProjectNavigatorVisible, disabled: false },
    { buttonId: 'cmButObjTranspMenu', active: this.isFloatingBarIsolationObjectsVisible, disabled: false },
    { buttonId: 'cmButObjSel', active: this.isFloatingBarHideObjectsVisible, disabled: false },
    { buttonId: 'cmButResetObj', disabled: false },
    { buttonId: 'cmButResetVp', disabled: false }
  ]

  toolHubItemClicked(item: string) {

    switch (item) {
      case 'cmButResetObj': alert('resetView'); return;
      case 'cmButResetVp': this.toolHubComponent?.toggleSubItemsView(item); return;
      case 'cmButObjTranspMenu': this.handleHideObjectsFloatingBarClicked(); return;
      case 'cmButObjSel': this.handleIsolationObjectsFloatingBarClicked(); return;
      case 'cmButProjectNavigator': this.handleProjectNavigatorClicked(); return;
      default: alert("Handler not implemented for " + item); break;
    }
  }

  toolHubSubItemClicked(item: string) {
    const alertMessage = `toolHubSubItemClicked(${item})`;
    switch (item) {
      case 'cmButFrontView':
      case 'cmButTopView':
      case 'cmButSideView':
      case 'cmButPerspectiveView':
      case 'cmButToggleProjection':
        alert(alertMessage);
        return;
    }
  }

  // #endregion

  // #region Hide object floating bar

  hideObjectsFloatingBarItems: Array<FloatingBarItem> = Array<FloatingBarItem>(
    {
      buttonId: 'cmButObjHide',
      iconClass: 'ui-icon-hide-object',
      title: '_Hide object',
      active: true, // very first time this button is active
    },
    {
      buttonId: "cmButObjTransp",
      iconClass: 'ui-icon-transparent-object',
      title: "_Transparent_object",
      active: false,
    },
    {
      buttonId: "cmbButObjHideRestore",
      iconClass: 'ui-icon-restore-hide-object',
      title: "_Restore_Hide",
      active: false,
    },
  );

  handleHideObjectsFloatingBarClicked() {
    this.isFloatingBarHideObjectsVisible = !this.isFloatingBarHideObjectsVisible;
    this.toolHubComponent?.toggleToolHubItemActive('cmButObjTranspMenu');
  }

  hideObjectsActionClicked(item: string) {
    switch (item) {
      case 'cmButObjHide':
        this.hideObjectsFloatingBarItems[0].active = true;
        this.hideObjectsFloatingBarItems[1].active = false;
        break;
      case 'cmButObjTransp':
        this.hideObjectsFloatingBarItems[0].active = false;
        this.hideObjectsFloatingBarItems[1].active = true;
        break;
      case 'cmbButObjHideRestore':
        alert(`hideObjectsActionClicked(${item})`);
        break;
    }
  }
  // #endregion

  // #region Isolation objects floating bar

  isolationObjectFloatingBarItems: Array<FloatingBarItem> = Array<FloatingBarItem>(
    {
      buttonId: 'cmbIsolateNormal',
      iconClass: 'ui-icon-isolate-menu-normal',
      title: '_Isolate',
      active: true, // very first time this button is active
    },
    {
      buttonId: "cmbIsolateClipped",
      iconClass: 'ui-icon-isolate-menu-clipped',
      title: "_Clipped_isolate",
      active: false,
    },
    {
      buttonId: "cmbIsolateHidden",
      iconClass: 'ui-icon-isolate-menu-hidden',
      title: "_Hidden_isolate",
      active: false,
    },
  );

  handleIsolationObjectsFloatingBarClicked() {
    this.isFloatingBarIsolationObjectsVisible = !this.isFloatingBarIsolationObjectsVisible;
    this.toolHubComponent?.toggleToolHubItemActive('cmButObjSel');
  }

  isolateObjectsActionClicked(item: string) {
    this.isolationObjectFloatingBarItems.forEach((barItem) => {
      if (barItem.buttonId === item) {
        barItem.active = true;
      }
      else if (barItem.active === true) {
        barItem.active = false;
      }
    });
  }

  // #endregion

  // #region Project navigator floating bar

  project: ProjectNavigatorProject = { id: "", name: "", teamSlug: "", models: [] };

  isPanelToolbarVisible: boolean = true; // add a panel toolbar
  expandedModelTree: boolean = true; // root node expanded

  getModels(project: ProjectNavigatorProject): Array<ProjectNavigatorModel> {
    const allModels: Array<ProjectNavigatorModel> = [];

    // === Fake Model 1 ===
    const model1Layers: Array<ProjectNavigatorLayer> = [
      {
        id: 'layer-1',
        name: 'Structural Elements',
        isVisible: true,
        isSemiVisible: false,
        isOpaque: true,
        isSemiOpaque: false,
        opacity: 1.0,
        userOpacity: 1.0,
        parentModel: null!, // temporary, will set below
      },
      {
        id: 'layer-2',
        name: 'HVAC System',
        isVisible: true,
        isSemiVisible: false,
        isOpaque: false,
        isSemiOpaque: true,
        opacity: 0.5,
        userOpacity: 0.5,
        parentModel: null!,
      }
    ];

    const model1: ProjectNavigatorModel = {
      id: 'model-1',
      name: 'Building Core',
      currentRevision: 1,
      latestRevision: 1,
      isVisible: true,
      isSemiVisible: true, // not all layers fully visible
      isOpaque: false,     // some layers transparent
      isSemiOpaque: true,
      isExpanded: false,
      divisionTopologyId: 'division-1',
      layers: model1Layers,
      parentProject: project,
    };

    // Link layers back to parent model
    for (const layer of model1Layers) {
      layer.parentModel = model1;
    }

    allModels.push(model1);

    // === Fake Model 2 ===
    const model2Layers: Array<ProjectNavigatorLayer> = [
      {
        id: 'layer-3',
        name: 'Electrical System',
        isVisible: false,
        isSemiVisible: false,
        isOpaque: true,
        isSemiOpaque: false,
        opacity: 1.0,
        userOpacity: 1.0,
        parentModel: null!,
      }
    ];

    const model2: ProjectNavigatorModel = {
      id: 'model-2',
      name: 'Electrical Layout',
      currentRevision: 2,
      latestRevision: 3,
      isVisible: false,
      isSemiVisible: false,
      isOpaque: true,
      isSemiOpaque: false,
      isExpanded: false,
      divisionTopologyId: 'division-2',
      layers: model2Layers,
      parentProject: project,
    };

    for (const layer of model2Layers) {
      layer.parentModel = model2;
    }

    allModels.push(model2);

    return allModels;
  }

  handleProjectNavigatorClicked() {
    this.isFloatingBarProjectNavigatorVisible = !this.isFloatingBarProjectNavigatorVisible;
    this.toolHubComponent?.toggleToolHubItemActive('cmButProjectNavigator');
  }

  toggleOpacityOfModel(model: ProjectNavigatorModel) {
    if (!model.layers) {
      return;
    }

    model.isOpaque = !model.isOpaque;
    model.layers.forEach(layer => { layer.isOpaque = model.isOpaque; });
    model.isSemiOpaque = false;
  }

  async toggleVisibilityOfModel(model: ProjectNavigatorModel) {
    if (!model.layers || !model.parentProject) {
      return;
    }

    model.isVisible = !model.isVisible;
    model.layers.forEach(layer => { layer.isVisible = model.isVisible });
    model.isSemiVisible = false;
  }

  toggleOpacityOfLayer(layer: ProjectNavigatorLayer) {
    const model = layer.parentModel;
    if (!layer || !model?.layers) {
      return;
    }

    layer.isOpaque = !layer.isOpaque;
    layer.opacity = layer.isOpaque ? 1 : 0.1;

    // Get semi state, depending on one turned off layer
    const isOneLayerTransparent: boolean = model.layers.some(layer => layer.isOpaque);
    const areAllLayersOpaque: boolean = model.layers.every(layer => layer.isOpaque);
    model.isOpaque = isOneLayerTransparent;
    model.isSemiOpaque = !areAllLayersOpaque;
  }

  async toggleVisibilityOfLayer(layer: ProjectNavigatorLayer) {
    const model = layer.parentModel;
    if (!layer || !model?.layers || !model.parentProject) {
      return;
    }

    layer.isVisible = !layer.isVisible;

    // Get semi state, depending on one turned off layer
    const isOneLayerVisible: boolean = model.layers.some(layer => layer.isVisible);
    const areAllLayersVisible: boolean = model.layers?.every(layer => layer.isVisible);
    model.isVisible = isOneLayerVisible;
    model.isSemiVisible = !areAllLayersVisible;
  }

  // #endregion
}

