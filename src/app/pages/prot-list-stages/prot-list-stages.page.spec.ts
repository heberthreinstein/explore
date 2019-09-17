import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtListStagesPage } from './prot-list-stages.page';

describe('ProtListStagesPage', () => {
  let component: ProtListStagesPage;
  let fixture: ComponentFixture<ProtListStagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtListStagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtListStagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
