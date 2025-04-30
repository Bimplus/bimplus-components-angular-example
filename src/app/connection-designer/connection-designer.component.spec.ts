import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService, } from '@ngx-translate/core';
import { ConnectionDesignerComponent } from './connection-designer.component';
import {
  ConnexisResult,
  ConnexisResultList,
  ConnexisResultsRoot,
  DesignCode,
  LanguageStringsService,
} from 'ngx-bimplus-components';

const mockDesignCode = {
  id: "designCodeId1",
  name: 'Design Code 1',
  codeNumber: 4711,
  code: "Code for 4711"
} as DesignCode;

const mockConnexisResultsRoot: ConnexisResultsRoot = {
  id: 'rootId',
  name: 'Root Results',
  resultList: [],
  isVisible: false,
  isSemiVisible: false,
};

const mockConnexisResultList: ConnexisResultList = {
  id: 'listId',
  name: 'Result List',
  colorHexCode: '',
  results: [],
  parent: mockConnexisResultsRoot,
  isVisible: false,
  isSemiVisible: false,
};

const mockConnexisResult1: ConnexisResult = {
  id: 'resultId1',
  name: 'Result 1',
  unityRatio: '1',
  message: 'Test message 1',
  isValid: true,
  isSelected: false,
  parent: mockConnexisResultList,
  isVisible: false,
  isSemiVisible: false,
};

const mockConnexisResult2: ConnexisResult = {
  id: 'resultId2',
  name: 'Result 2',
  unityRatio: '1',
  message: 'Test message 2',
  isValid: true,
  isSelected: false,
  parent: mockConnexisResultList,
  isVisible: false,
  isSemiVisible: false,
};
mockConnexisResultList.results = [mockConnexisResult1, mockConnexisResult2];
mockConnexisResultsRoot.resultList = [mockConnexisResultList];

describe('ConnectionDesignerComponent', () => {
  let component: ConnectionDesignerComponent;
  let fixture: ComponentFixture<ConnectionDesignerComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ConnectionDesignerComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        TranslateService,
        LanguageStringsService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionDesignerComponent);
    component = fixture.componentInstance;

    spyOn(component, 'toggleResultList').and.callThrough();
    spyOn(component, 'toggleResult').and.callThrough();
    spyOn(component, 'setVisibilityStatesForResultList').and.callThrough();
    spyOn(component, 'setVisibilityStatesForResults').and.callThrough();

    spyOn(console, 'debug');
  });

  afterEach(() => {
    mockConnexisResultsRoot.isVisible = false;
    mockConnexisResultList.isVisible = false;
    mockConnexisResult1.isVisible = false;
    mockConnexisResult2.isVisible = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log a message when clickedResultsRoot is called', () => {
    component.clickedResultsRoot(mockConnexisResultsRoot);

    expect(console.debug).toHaveBeenCalledWith('clickedResultsRoot called (rootId / Root Results)');
  });

  it('should log a message when clickedResultList is called', () => {
    component.clickedResultList(mockConnexisResultList);

    expect(console.debug).toHaveBeenCalledWith('clickedResultList called (listId / Result List)');
  });

  it('should toggle result selection and update viewport when clickedResult is called', () => {
    component.clickedResult(mockConnexisResult1);

    expect(mockConnexisResult1.isSelected).toBe(true);
  });

  it('should start calculation successfully', () => {
    component.currentDesignCode = mockDesignCode;
    component.startCalculationClicked();

    expect(component.errorMessage).toBe('');
  });

  function checkAllResultsNotVisible() {
    expect(mockConnexisResultsRoot.isVisible).toBeFalse();
    expect(mockConnexisResultList.isVisible).toBeFalse();
    expect(mockConnexisResult1.isVisible).toBeFalse();
    expect(mockConnexisResult2.isVisible).toBeFalse();
  }

  function checkAllResultsVisible() {
    expect(mockConnexisResultsRoot.isVisible).toBeTrue();
    expect(mockConnexisResultList.isVisible).toBeTrue();
    expect(mockConnexisResult1.isVisible).toBeTrue();
    expect(mockConnexisResult2.isVisible).toBeTrue();
  }

  it('should toggle visibility of results root and its children', () => {
    checkAllResultsNotVisible();

    component.toggleVisibilityResultsRoot(mockConnexisResultsRoot);

    checkAllResultsVisible();

    expect(component.toggleResultList).toHaveBeenCalledWith(mockConnexisResultList, true);
    expect(component.toggleResult).toHaveBeenCalledWith(mockConnexisResult1, true);
    expect(component.toggleResult).toHaveBeenCalledWith(mockConnexisResult2, true);
    expect(component.setVisibilityStatesForResults).toHaveBeenCalledWith(mockConnexisResultsRoot);
  });

  it('should toggle visibility of result list and its children', () => {
    checkAllResultsNotVisible();

    component.toggleVisibilityResultList(mockConnexisResultList);

    checkAllResultsVisible();

    expect(component.toggleResult).toHaveBeenCalledWith(mockConnexisResult1, true);
    expect(component.toggleResult).toHaveBeenCalledWith(mockConnexisResult2, true);
    expect(component.setVisibilityStatesForResultList).toHaveBeenCalledWith(mockConnexisResultList);
    expect(component.setVisibilityStatesForResults).toHaveBeenCalledWith(mockConnexisResultList.parent);
  });

  it('should toggle visibility of result', () => {
    checkAllResultsNotVisible();

    component.toggleVisibilityResult(mockConnexisResult1); // only result1 will be colorized

    expect(mockConnexisResultsRoot.isVisible).toBeTrue();
    expect(mockConnexisResultList.isVisible).toBeTrue();
    expect(mockConnexisResult1.isVisible).toBeTrue();
    expect(mockConnexisResult2.isVisible).toBeFalse(); // is not colorized

    expect(component.setVisibilityStatesForResultList).toHaveBeenCalledWith(mockConnexisResult1.parent);
    expect(component.setVisibilityStatesForResults).toHaveBeenCalledWith(mockConnexisResult1.parent.parent);
  });

  it('should call cleanup when doneClicked is invoked', () => {
    component.results = mockConnexisResultsRoot; // Set some value
    component.errorMessage = 'Some error message'; // Set some value
    spyOn(component, 'cleanup').and.callThrough();

    component.doneClicked();

    expect(component.cleanup).toHaveBeenCalledWith();
    expect(component.results).toBeNull();
    expect(component.errorMessage).toBe('');
  });

  it('should log result root on doubleClickedResultsRoot', () => {
    component.doubleClickedResultsRoot(mockConnexisResultsRoot);

    expect(console.debug).toHaveBeenCalledWith(
      'doubleClickedResultsRoot called (rootId / Root Results)'
    );
  });

  it('should log result list on doubleClickedResultList', () => {
    component.doubleClickedResultList(mockConnexisResultList);

    expect(console.debug).toHaveBeenCalledWith(
      'doubleClickedResultList called (listId / Result List)'
    );
  });

  it('should log result on doubleClickedResult', () => {
    component.doubleClickedResult(mockConnexisResult1);

    expect(console.debug).toHaveBeenCalledWith(
      'doubleClickedResult called (resultId1 / Result 1)'
    );
  });

  it('should log result on mouseEnteredResult', () => {
    component.mouseEnteredResult(mockConnexisResult2);

    expect(console.debug).toHaveBeenCalledWith(
      'mouseEnteredResult called (resultId2 / Result 2)'
    );
  });

  it('should log on mouseLeftResult', () => {
    component.mouseLeftResult();

    expect(console.debug).toHaveBeenCalledWith('mouseLeftResult called');
  });

  it('should set currentDesignCode and enable calculation when designCode is provided', () => {
    component.designCodeChanged(mockDesignCode);

    expect(component.currentDesignCode).toEqual(mockDesignCode);
    expect(component.calculationCanBeStarted).toBeTrue();
  });

  it('should set currentDesignCode to null and not enable calculation when designCode is null', () => {
    component.designCodeChanged(null);

    expect(component.currentDesignCode).toBeNull();
    expect(component.calculationCanBeStarted).toBeFalse();
  });  
});
