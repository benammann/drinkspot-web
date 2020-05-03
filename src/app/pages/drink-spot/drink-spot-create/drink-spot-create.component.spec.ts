import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkSpotCreateComponent } from './drink-spot-create.component';

describe('DrinkSpotCreateComponent', () => {
  let component: DrinkSpotCreateComponent;
  let fixture: ComponentFixture<DrinkSpotCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkSpotCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkSpotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
