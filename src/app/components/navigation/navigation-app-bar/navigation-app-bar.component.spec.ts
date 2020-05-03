import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationAppBarComponent } from './navigation-app-bar.component';

describe('NavigationAppBarComponent', () => {
  let component: NavigationAppBarComponent;
  let fixture: ComponentFixture<NavigationAppBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationAppBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
