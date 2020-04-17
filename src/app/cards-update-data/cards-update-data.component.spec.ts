import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsUpdateDataComponent } from './cards-update-data.component';

describe('CardsUpdateDataComponent', () => {
  let component: CardsUpdateDataComponent;
  let fixture: ComponentFixture<CardsUpdateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsUpdateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsUpdateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
