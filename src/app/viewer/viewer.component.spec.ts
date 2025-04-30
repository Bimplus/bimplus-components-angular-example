import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule, TranslateService, } from '@ngx-translate/core';
import { ViewerComponent } from './viewer.component';
import {
  BimplusToolHubComponent,
  LanguageStringsService,
  ProjectNavigatorLayer,
  ProjectNavigatorModel,
  ProjectNavigatorProject
} from 'ngx-bimplus-components';

const mockProjModel1Layer1 = {
  id: 'layerId1',
  name: 'Layer1',
  isVisible: false,
  isOpaque: false,
  opacity: 1.0,
  parentModel: null,
} as ProjectNavigatorLayer;

const mockProjModel1Layer2 = {
  id: 'layerId2',
  name: 'Layer2',
  isVisible: false,
  isOpaque: false,
  opacity: 1.0,
  parentModel: null,
} as ProjectNavigatorLayer;

const mockProjModel1 = {
  id: 'modelId1',
  name: 'Model1',
  isVisible: false,
  isSemiVisible: false,
  isOpaque: false,
  isSemiOpaque: false,
  layers: [mockProjModel1Layer1, mockProjModel1Layer2],
  parentProject: null,
} as ProjectNavigatorModel;

mockProjModel1Layer1.parentModel = mockProjModel1;
mockProjModel1Layer2.parentModel = mockProjModel1;

const mockProjModel2Layer1 = {
  id: 'model2LayerId1',
  name: 'Layer1',
  isVisible: false,
  isOpaque: false,
  opacity: 1.0,
  parentModel: null,
} as ProjectNavigatorLayer;

const mockProjModel2Layer2 = {
  id: 'model2LayerId2',
  name: 'Layer2',
  isVisible: false,
  isOpaque: false,
  opacity: 1.0,
  parentModel: null,
} as ProjectNavigatorLayer;

const mockProjModel2 = {
  id: 'modelId2',
  name: 'Model2',
  isVisible: false,
  isSemiVisible: false,
  isOpaque: false,
  isSemiOpaque: false,
  layers: [mockProjModel2Layer1, mockProjModel2Layer2],
  parentProject: null,
} as ProjectNavigatorModel;

mockProjModel2Layer1.parentModel = mockProjModel2;
mockProjModel2Layer2.parentModel = mockProjModel2;

const mockProj = {
  id: 'projId',
  name: 'Project1',
  teamSlug: 'team1',
  models: [mockProjModel1, mockProjModel2],
} as ProjectNavigatorProject;

mockProjModel1.parentProject = mockProj;
mockProjModel2.parentProject = mockProj;

describe('ViewerComponent', () => {
  let component: ViewerComponent;
  let fixture: ComponentFixture<ViewerComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let bimplusToolHubComponentSpy: jasmine.SpyObj<BimplusToolHubComponent>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', [], {
      navigate: jasmine.createSpy('navigate')
    });

    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      queryParams: of({ project_id: '123', team_id: '456' })
    });

    bimplusToolHubComponentSpy = jasmine.createSpyObj('toolHubComponent', [
      'toggleSubItemsView',
      'toggleToolHubItemActive',
      'toggleCameraProjection',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TranslateModule.forRoot(),
        ViewerComponent,
      ],
      providers: [
        TranslateService,
        LanguageStringsService,
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {

    // 1st structure is false
    mockProjModel1Layer1.isVisible = false;
    mockProjModel1Layer1.isOpaque = false;
    mockProjModel1Layer1.opacity = 1.0;
    mockProjModel1Layer2.isVisible = false;
    mockProjModel1Layer2.isOpaque = false;
    mockProjModel1Layer2.opacity = 1.0;
    mockProjModel1.isVisible = false;
    mockProjModel1.isSemiVisible = false;
    mockProjModel1.isOpaque = false;
    mockProjModel1.isSemiOpaque = false;

    // 2nd structure is always true
    mockProjModel2Layer1.isVisible = true;
    mockProjModel2Layer1.isOpaque = true;
    mockProjModel2Layer1.opacity = 1.0;
    mockProjModel2Layer2.isVisible = true;
    mockProjModel2Layer2.isOpaque = true;
    mockProjModel2Layer2.opacity = 1.0;
    mockProjModel2.isVisible = true;
    mockProjModel2.isSemiVisible = true;
    mockProjModel2.isOpaque = true;
    mockProjModel2.isSemiOpaque = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.toolHubComponent).toBeTruthy();
  });

  it('should alert when window is resized', () => {
    spyOn(window, 'alert');

    // Dispatch a fake resize event
    window.dispatchEvent(new Event('resize'));

    expect(window.alert).toHaveBeenCalledWith("Window resized: [object Event]");
  });

  it('should alert "resetView" when cmButResetObj is clicked', () => {
    spyOn(window, 'alert');

    component.toolHubItemClicked('cmButResetObj');

    expect(window.alert).toHaveBeenCalledWith('resetView');
  });

  it('should call toggleSubItemsView when item is cmButResetVp', () => {
    component.toolHubComponent = bimplusToolHubComponentSpy;
    component.toolHubItemClicked('cmButResetVp');

    expect(bimplusToolHubComponentSpy.toggleSubItemsView).toHaveBeenCalledWith('cmButResetVp');
  });

  it('should toggle visibility of hide objects floating bar (cmButObjTranspMenu)', () => {
    component.toolHubComponent = bimplusToolHubComponentSpy;
    spyOn(component, 'handleHideObjectsFloatingBarClicked').and.callThrough();

    expect(component.isFloatingBarHideObjectsVisible).toBe(false); // Initial state check

    component.toolHubItemClicked('cmButObjTranspMenu');

    expect(component.isFloatingBarHideObjectsVisible).toBe(true); // State should change
    expect(component['handleHideObjectsFloatingBarClicked']).toHaveBeenCalledWith();
    expect(bimplusToolHubComponentSpy.toggleToolHubItemActive).toHaveBeenCalledWith('cmButObjTranspMenu');

    component.toolHubItemClicked('cmButObjTranspMenu');

    expect(component.isFloatingBarHideObjectsVisible).toBe(false); // State should change
    expect(component['handleHideObjectsFloatingBarClicked']).toHaveBeenCalledWith();
    expect(bimplusToolHubComponentSpy.toggleToolHubItemActive).toHaveBeenCalledWith('cmButObjTranspMenu');
    expect(component.toolHubComponent.toggleToolHubItemActive).toHaveBeenCalledTimes(2); // Should have been called twice
  });

  it('should toggle visibility of isolation objects floating bar (ButObjSel)', () => {
    component.toolHubComponent = bimplusToolHubComponentSpy;
    spyOn(component, 'handleIsolationObjectsFloatingBarClicked').and.callThrough();

    expect(component.isFloatingBarIsolationObjectsVisible).toBe(false); // Initial state check

    component.toolHubItemClicked('cmButObjSel');

    expect(component.isFloatingBarIsolationObjectsVisible).toBe(true); // State should change
    expect(component['handleIsolationObjectsFloatingBarClicked']).toHaveBeenCalledWith();
    expect(bimplusToolHubComponentSpy.toggleToolHubItemActive).toHaveBeenCalledWith('cmButObjSel');

    component.toolHubItemClicked('cmButObjSel');

    expect(component.isFloatingBarIsolationObjectsVisible).toBe(false); // State should change
    expect(component['handleIsolationObjectsFloatingBarClicked']).toHaveBeenCalledWith();
    expect(bimplusToolHubComponentSpy.toggleToolHubItemActive).toHaveBeenCalledWith('cmButObjSel');
    expect(component.toolHubComponent.toggleToolHubItemActive).toHaveBeenCalledTimes(2); // Should have been called twice
  });

  it('should toggle visibility of project navigator floating bar', () => {
    component.toolHubComponent = bimplusToolHubComponentSpy;
    spyOn(component, 'handleProjectNavigatorClicked').and.callThrough();

    expect(component.isFloatingBarProjectNavigatorVisible).toBeTrue(); // Initial state is visible

    component.toolHubItemClicked('cmButProjectNavigator');

    expect(component['handleProjectNavigatorClicked']).toHaveBeenCalledWith();
    expect(component.isFloatingBarProjectNavigatorVisible).toBeFalse(); // State should change
    expect(component.toolHubComponent.toggleToolHubItemActive).toHaveBeenCalledWith('cmButProjectNavigator');

    component.toolHubItemClicked('cmButProjectNavigator');

    expect(component['handleProjectNavigatorClicked']).toHaveBeenCalledWith();
    expect(component.isFloatingBarProjectNavigatorVisible).toBeTrue(); // State should change
    expect(component.toolHubComponent.toggleToolHubItemActive).toHaveBeenCalledWith('cmButProjectNavigator');
    expect(component.toolHubComponent.toggleToolHubItemActive).toHaveBeenCalledTimes(2); // Should have been called twice
  });

  it('should alert when item is unknown', () => {
    spyOn(window, 'alert');
    component.toolHubItemClicked('unknownItem');

    expect(window.alert).toHaveBeenCalledWith('Handler not implemented for unknownItem');
  });

  it('should alert the correct message based on the item clicked', () => {
    spyOn(window, 'alert');

    component.toolHubSubItemClicked('cmButFrontView');

    expect(window.alert).toHaveBeenCalledWith('toolHubSubItemClicked(cmButFrontView)');

    component.toolHubSubItemClicked('cmButTopView');

    expect(window.alert).toHaveBeenCalledWith('toolHubSubItemClicked(cmButTopView)');

    component.toolHubSubItemClicked('cmButSideView');

    expect(window.alert).toHaveBeenCalledWith('toolHubSubItemClicked(cmButSideView)');

    component.toolHubSubItemClicked('cmButPerspectiveView');

    expect(window.alert).toHaveBeenCalledWith('toolHubSubItemClicked(cmButPerspectiveView)');

    component.toolHubSubItemClicked('cmButToggleProjection');

    expect(window.alert).toHaveBeenCalledWith('toolHubSubItemClicked(cmButToggleProjection)');
  });

  it('should change active item and update hide objects floating bar', () => {
    expect(component.hideObjectsFloatingBarItems[0].active).toBeTrue();
    expect(component.hideObjectsFloatingBarItems[1].active).toBeFalse();

    component.hideObjectsActionClicked('cmButObjTransp');

    expect(component.hideObjectsFloatingBarItems[0].active).toBeFalse();
    expect(component.hideObjectsFloatingBarItems[1].active).toBeTrue();

    component.hideObjectsActionClicked('cmButObjHide');

    expect(component.hideObjectsFloatingBarItems[0].active).toBeTrue();
    expect(component.hideObjectsFloatingBarItems[1].active).toBeFalse();

    component.hideObjectsActionClicked('cmbButObjHideRestore');

    expect(component.hideObjectsFloatingBarItems[0].active).toBeTrue();
    expect(component.hideObjectsFloatingBarItems[1].active).toBeFalse();
  });

  it('should activate the clicked isolation object item', () => {
    // Simulate clicking on already active button
    expect(component.isolationObjectFloatingBarItems.find(i => i.buttonId === 'cmbIsolateNormal')?.active).toBe(true);

    component.isolateObjectsActionClicked('cmbIsolateNormal');

    expect(component.isolationObjectFloatingBarItems.find(i => i.buttonId === 'cmbIsolateNormal')?.active).toBe(true);

    component.isolateObjectsActionClicked('cmbIsolateClipped');

    expect(component.isolationObjectFloatingBarItems.find(i => i.buttonId === 'cmbIsolateClipped')?.active).toBe(true);

    component.isolateObjectsActionClicked('cmbIsolateHidden');

    expect(component.isolationObjectFloatingBarItems.find(i => i.buttonId === 'cmbIsolateHidden')?.active).toBe(true);
  });

  function checkAllModelLayersNotOpaque() {
    expect(mockProjModel1Layer1.isOpaque).toBeFalse();
    expect(mockProjModel1Layer2.isOpaque).toBeFalse();
    expect(mockProjModel1.isOpaque).toBeFalse();
    expect(mockProjModel1.isSemiOpaque).toBeFalse();
  }

  it('should toggle opacity of model', () => {
    checkAllModelLayersNotOpaque();

    component.toggleOpacityOfModel(mockProjModel1);

    expect(mockProjModel1Layer1.isOpaque).toBeTrue();
    expect(mockProjModel1Layer2.isOpaque).toBeTrue();
    expect(mockProjModel1.isOpaque).toBeTrue();
    expect(mockProjModel1.isSemiOpaque).toBeFalse(); // <== all layers are opaque
  });

  it('should toggle opacity of single layers', () => {
    checkAllModelLayersNotOpaque();

    component.toggleOpacityOfLayer(mockProjModel1Layer1);

    expect(mockProjModel1Layer1.isOpaque).toBeTrue();
    expect(mockProjModel1Layer2.isOpaque).toBeFalse();
    expect(mockProjModel1.isOpaque).toBeTrue();
    expect(mockProjModel1.isSemiOpaque).toBeTrue(); // <=== only one layer was set opaque, model is only semiOpaque

    component.toggleOpacityOfLayer(mockProjModel1Layer2);

    expect(mockProjModel1Layer1.isOpaque).toBeTrue();
    expect(mockProjModel1Layer2.isOpaque).toBeTrue();
    expect(mockProjModel1.isOpaque).toBeTrue();
  });

  function checkAllModelLayersNotVisible() {
    expect(mockProjModel1Layer1.isVisible).toBeFalse();
    expect(mockProjModel1Layer2.isVisible).toBeFalse();
    expect(mockProjModel1.isVisible).toBeFalse();
    expect(mockProjModel1.isSemiVisible).toBeFalse();
  }

  it('should toggle visibility of model', async () => {
    checkAllModelLayersNotVisible();

    await component.toggleVisibilityOfModel(mockProjModel1);

    expect(mockProjModel1Layer1.isVisible).toBeTrue();
    expect(mockProjModel1Layer2.isVisible).toBeTrue();
    expect(mockProjModel1.isVisible).toBeTrue();
    expect(mockProjModel1.isSemiVisible).toBeFalse(); // <== all layers are visible
  });

  it('should toggle visibility of single layers', async () => {
    checkAllModelLayersNotVisible();

    await component.toggleVisibilityOfLayer(mockProjModel1Layer1);

    expect(mockProjModel1Layer1.isVisible).toBeTrue();
    expect(mockProjModel1Layer2.isVisible).toBeFalse();
    expect(mockProjModel1.isVisible).toBeTrue();
    expect(mockProjModel1.isSemiVisible).toBeTrue(); // <== only one layer visible, model is semi visible

    await component.toggleVisibilityOfLayer(mockProjModel1Layer2);

    expect(mockProjModel1Layer1.isVisible).toBeTrue();
    expect(mockProjModel1Layer2.isVisible).toBeTrue();
    expect(mockProjModel1.isVisible).toBeTrue();
  });

  it('should return early if model.layers is missing', async () => {
    const model = { layers: undefined } as unknown as ProjectNavigatorModel; // Fake broken model
    const layer = { parentModel: undefined } as unknown as ProjectNavigatorLayer; // Fake broken layer

    expect(component.toggleOpacityOfModel(model)).toBeUndefined();
    expect(await component.toggleVisibilityOfModel(model)).toBeUndefined();
    expect(component.toggleOpacityOfLayer(layer)).toBeUndefined();
    expect(await component.toggleVisibilityOfLayer(layer)).toBeUndefined();
  });
});