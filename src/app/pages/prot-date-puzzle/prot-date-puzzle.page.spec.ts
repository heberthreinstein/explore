import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtDatePuzzlePage } from './prot-date-puzzle.page';

describe('ProtDatePuzzlePage', () => {
  let component: ProtDatePuzzlePage;
  let fixture: ComponentFixture<ProtDatePuzzlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtDatePuzzlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtDatePuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
