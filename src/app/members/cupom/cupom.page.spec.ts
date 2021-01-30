import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupomPage } from './cupom.page';

describe('CupomPage', () => {
  let component: CupomPage;
  let fixture: ComponentFixture<CupomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
