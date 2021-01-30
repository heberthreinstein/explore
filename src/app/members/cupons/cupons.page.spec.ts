import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponsPage } from './cupons.page';

describe('CuponsPage', () => {
  let component: CuponsPage;
  let fixture: ComponentFixture<CuponsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
