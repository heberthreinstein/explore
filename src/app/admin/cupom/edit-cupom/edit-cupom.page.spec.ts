import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCupomPage } from './edit-cupom.page';

describe('EditCupomPage', () => {
  let component: EditCupomPage;
  let fixture: ComponentFixture<EditCupomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCupomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCupomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
