import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormigaPage } from './formiga.page';

describe('FormigaPage', () => {
  let component: FormigaPage;
  let fixture: ComponentFixture<FormigaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormigaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormigaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
