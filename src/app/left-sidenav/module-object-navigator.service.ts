import { Injectable, Input, inject } from '@angular/core';
import { CursorsService, FilterType } from 'ngx-bimplus-components';

const AllFilterType: FilterType = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "All"
};

@Injectable({
  providedIn: 'root',
})
export class ModuleObjectNavigatorService {
  private readonly cursorsService = inject(CursorsService);


  constructor() {
    console.debug("ModuleObjectNavigatorService initialized");
  }

  private _availableFilterTypes: Array<FilterType> = [AllFilterType];
  get availableFilterTypes(): Array<FilterType> {
    return this._availableFilterTypes;
  }

  @Input()
  selectedObjectId: string | null = null;

  @Input()
  selectedRevision: number | undefined = undefined;

  @Input()
  selectedObjects: string[] = [];

  @Input()
  exportObject: null = null;

  handleFilterResultObjectSelectionChanged(selection: string[]) {
    console.debug("handleFilterResultObjectSelectionChanged", selection);
  }

  handleFilterResultObjectDoubleClicked(id: string) {
    console.debug("handleFilterResultObjectDoubleClicked", id);
  }

  handleFilterResultObjectMouseEntered(id: string) {
    console.debug("handleFilterResultObjectMouseEntered", id);
  }

  handleFilterResultObjectMouseLeft() {
    console.debug("handleFilterResultObjectMouseLeft");
  }

  handlePipetteActiveStatus(status: boolean) {
    this.cursorsService.showPickCursor(status);
  }
}
