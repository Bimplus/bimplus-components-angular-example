import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LeftSidenavComponent } from './left-sidenav.component';
import { 
  BimplusContextMenuItem, 
  LanguageStringsService,
} from 'ngx-bimplus-components';
import { ConnectionDesignerComponent } from './../connection-designer/connection-designer.component';

describe('LeftSidenavComponent', () => {
  let component: LeftSidenavComponent;
  let fixture: ComponentFixture<LeftSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LeftSidenavComponent,
        ConnectionDesignerComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        TranslateService,
        LanguageStringsService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display alert for sidenavActionClicked', () => {
    spyOn(window, 'alert'); // Spy on the alert function
    component.sidenavActionClicked('menu'); // Call the method with a mock string

    expect(window.alert).toHaveBeenCalledWith('Clicked navbar action: menu');
  });

  it('should display alert for sidenavFooterClicked', () => {
    spyOn(window, 'alert'); // Spy on the alert function
    component.sidenavFooterClicked('footer'); // Call the method with a mock string

    expect(window.alert).toHaveBeenCalledWith('Clicked sidenav footer: footer');
  });

  it('should disable context menu item based on disabled function', () => {
    const mockData: object = { id: 1 }; // Mock data object to be passed to disabled function

    // Iterate through each context menu item
    component.filterContextMenu.forEach((item: BimplusContextMenuItem) => {
      if (item.disabled && typeof item.disabled === 'function') {
        const isDisabled = item.disabled(mockData); // Call the disabled function with mock data

        expect(isDisabled).toBeFalse(); // Ensure the disabled function returns a boolean
      } else {
        fail(`'disabled' function is not defined for item: ${item.id}`);
      }
    });
  });

  it('should trigger action when context menu item is clicked', () => {
    spyOn(window, 'alert'); // Spy on the alert function
    const mockData = { id: '1' }; // Mock data object to be passed to action function

    // Iterate through each context menu item
    component.filterContextMenu.forEach((item: BimplusContextMenuItem) => {
      // Ensure item.action is defined and callable before calling it
      if (item.action && typeof item.action === 'function') {
        item.action(mockData); // Call the action function with mock data

        expect(window.alert).toHaveBeenCalledWith(`Click on the context menu item: ${item.title}`);
      } else {
        fail(`'action' function is not defined or not callable for item: ${item.id}`);
      }
    });
  });

});
