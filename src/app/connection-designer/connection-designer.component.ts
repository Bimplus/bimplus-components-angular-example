import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  BimplusConnectionDesignerComponent,
  BimplusConnectionDesignerResultsComponent,
  DesignCode,
  ConnexisResultsRoot,
  ConnexisResultList,
  ConnexisResult,
  LanguageStringsService,
} from 'ngx-bimplus-components';

@Component({
  selector: 'app-connection-designer',
  imports: [
    CommonModule,
    BimplusConnectionDesignerComponent,
    BimplusConnectionDesignerResultsComponent,
  ],
  templateUrl: './connection-designer.component.html',
  styleUrl: './connection-designer.component.less',
})
export class ConnectionDesignerComponent implements OnDestroy {

  constructor(
    public languageStringsService: LanguageStringsService
  ) {
  }

  errorMessage: string = '';

  calculationCanBeStarted: boolean = false;
  currentDesignCode: DesignCode | null = null;

  results: ConnexisResultsRoot | null = null;
  expandedTreeRoot: boolean = true; // root node expanded
  expandedResultTrees: boolean = false; // result list nodes not expanded
  private readonly passedListColorHex: string = '#006400';
  private readonly failedListColorHex: string = '#b71c1c';

  ngOnDestroy(): void {
    console.debug('ConnectionDesignerComponent destroyed');
    this.cleanup();
  }

  cleanup() {
    this.results = null;
    this.errorMessage = '';
  }

  designCodeChanged(designCode: DesignCode | null) {
    this.currentDesignCode = designCode;
    if (designCode) {
      this.calculationCanBeStarted = true;
    }
  }

  startCalculationClicked() {
    const mockConnexisResults: ConnexisResultsRoot = {
      id: 'root-1',
      name: 'Root Of Result',
      isVisible: true,
      isSemiVisible: false,
      resultList: [] // to be filled below
    };

    const failedResultList: ConnexisResultList = {
      id: 'list-1',
      name: 'Failed Result List',
      colorHexCode: this.failedListColorHex,
      isVisible: true,
      isSemiVisible: false,
      parent: mockConnexisResults,
      results: [] // to be filled below
    };

    const passedResultList: ConnexisResultList = {
      id: 'list-2',
      name: 'Passed Result List',
      colorHexCode: this.passedListColorHex,
      isVisible: true,
      isSemiVisible: false,
      parent: mockConnexisResults,
      results: [] // to be filled below
    };

    const failedResult: ConnexisResult = {
      id: 'res-1',
      name: 'Result1',
      message: 'Some failed error message',
      isValid: true,
      unityRatio: '0.85',
      isSelected: false,
      isVisible: true,
      isSemiVisible: false,
      parent: failedResultList
    };

    const passedResult1: ConnexisResult = {
      id: 'res-2',
      name: 'Result2',
      message: 'Sample message',
      isValid: true,
      unityRatio: '0.85',
      isSelected: false,
      isVisible: true,
      isSemiVisible: false,
      parent: passedResultList
    };

    const passedResult2: ConnexisResult = {
      id: 'res-3',
      name: 'Result3',
      message: 'Works fine',
      isValid: true,
      unityRatio: '0.85',
      isSelected: false,
      isVisible: true,
      isSemiVisible: false,
      parent: passedResultList
    };

    // Assemble the hierarchy
    failedResultList.results.push(failedResult);
    passedResultList.results.push(passedResult1);
    passedResultList.results.push(passedResult2);

    mockConnexisResults.resultList.push(passedResultList);
    mockConnexisResults.resultList.push(failedResultList);

    this.results = mockConnexisResults;
  }

  clickedResultsRoot(results: ConnexisResultsRoot) {
    console.debug(`clickedResultsRoot called (${results.id} / ${results.name})`);
  }

  clickedResultList(resultList: ConnexisResultList) {
    console.debug(`clickedResultList called (${resultList.id} / ${resultList.name})`);
  }

  clickedResult(result: ConnexisResult) {
    const oldSelectionState = result.isSelected;
    result.parent?.parent?.resultList.forEach(resultList => {
      resultList.results?.forEach(result => result.isSelected = false);
    });
    result.isSelected = !oldSelectionState;
  }

  doubleClickedResultsRoot(results: ConnexisResultsRoot) {
    console.debug(`doubleClickedResultsRoot called (${results.id} / ${results.name})`);
  }

  doubleClickedResultList(resultList: ConnexisResultList) {
    console.debug(`doubleClickedResultList called (${resultList.id} / ${resultList.name})`);
  }

  doubleClickedResult(result: ConnexisResult) {
    console.debug(`doubleClickedResult called (${result.id} / ${result.name})`);
  }

  mouseEnteredResult(result: ConnexisResult) {
    console.debug(`mouseEnteredResult called (${result.id} / ${result.name})`);
  }

  mouseLeftResult() {
    console.debug(`mouseLeftResult called`);
  }

  toggleVisibilityResultsRoot(results: ConnexisResultsRoot) {
    results.isVisible = !results.isVisible;
    results.resultList?.forEach(resultList => this.toggleResultList(resultList, results.isVisible));
    this.setVisibilityStatesForResults(results);
  }

  toggleVisibilityResultList(resultList: ConnexisResultList) {
    resultList.isVisible = !resultList.isVisible;
    resultList.results.forEach(result => this.toggleResult(result, resultList.isVisible));
    this.setVisibilityStatesForResultList(resultList);
    this.setVisibilityStatesForResults(resultList.parent);
  }

  toggleVisibilityResult(result: ConnexisResult) {
    result.isVisible = !result.isVisible;
    this.setVisibilityStatesForResultList(result.parent);
    this.setVisibilityStatesForResults(result.parent.parent);
  }

  toggleResultList(resultList: ConnexisResultList, parentVisibleState: boolean) {
    resultList.isVisible = parentVisibleState;
    resultList.results.forEach(result => this.toggleResult(result, resultList.isVisible));
    this.setVisibilityStatesForResultList(resultList);
  }

  toggleResult(result: ConnexisResult, parentVisibleState: boolean) {
    result.isVisible = parentVisibleState;
  }

  setVisibilityStatesForResults(results: ConnexisResultsRoot) {
    const isOneResultListVisible: boolean = results.resultList.some(resultList => resultList.isVisible);
    const isOneResultListSemiVisible: boolean = results.resultList.some(resultList => resultList.isSemiVisible);
    results.isVisible = isOneResultListVisible;
    results.isSemiVisible = isOneResultListSemiVisible;
  }

  setVisibilityStatesForResultList(resultList: ConnexisResultList) {
    const isOneResultVisible: boolean = resultList.results.some(result => result.isVisible);
    const areAllResultsVisible: boolean = resultList.results.every(result => result.isVisible);
    resultList.isVisible = isOneResultVisible;
    resultList.isSemiVisible = !areAllResultsVisible;
  }

  doneClicked() {
    this.cleanup();
  }
}
