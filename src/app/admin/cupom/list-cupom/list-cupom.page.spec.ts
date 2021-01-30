import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCupomPage } from './list-cupom.page';

describe('ListCupomPage', () => {
  let component: ListCupomPage;
  let fixture: ComponentFixture<ListCupomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCupomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCupomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
