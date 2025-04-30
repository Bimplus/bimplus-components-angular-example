import { TestBed } from '@angular/core/testing';
import { ModuleObjectNavigatorService } from './module-object-navigator.service';
import { CursorsService } from 'ngx-bimplus-components';

describe('ModuleObjectNavigatorService', () => {
  let service: ModuleObjectNavigatorService;
  let cursorsServiceSpy: jasmine.SpyObj<CursorsService>;

  beforeEach(() => {
    cursorsServiceSpy = jasmine.createSpyObj('CursorsService', ['showPickCursor']);

    TestBed.configureTestingModule({
      providers: [
        ModuleObjectNavigatorService,
        { provide: CursorsService, useValue: cursorsServiceSpy },
      ]
    });

    service = TestBed.inject(ModuleObjectNavigatorService);
  });

  it('should log selection in handleFilterResultObjectSelectionChanged', () => {
    spyOn(console, 'debug');
    const selection = ['id1', 'id2'];
    service.handleFilterResultObjectSelectionChanged(selection);

    expect(console.debug).toHaveBeenCalledWith('handleFilterResultObjectSelectionChanged', selection);
  });

  it('should log id in handleFilterResultObjectDoubleClicked', () => {
    spyOn(console, 'debug');
    const id = 'abc123';
    service.handleFilterResultObjectDoubleClicked(id);

    expect(console.debug).toHaveBeenCalledWith('handleFilterResultObjectDoubleClicked', id);
  });

  it('should log id in handleFilterResultObjectMouseEntered', () => {
    spyOn(console, 'debug');
    const id = 'hover123';
    service.handleFilterResultObjectMouseEntered(id);

    expect(console.debug).toHaveBeenCalledWith('handleFilterResultObjectMouseEntered', id);
  });

  it('should log mouse left event in handleFilterResultObjectMouseLeft', () => {
    spyOn(console, 'debug');
    service.handleFilterResultObjectMouseLeft();

    expect(console.debug).toHaveBeenCalledWith('handleFilterResultObjectMouseLeft');
  });

  it('should call cursorsService.showPickCursor with status in handlePipetteActiveStatus', () => {
    service.handlePipetteActiveStatus(true);

    expect(cursorsServiceSpy.showPickCursor).toHaveBeenCalledWith(true);
  });

});
