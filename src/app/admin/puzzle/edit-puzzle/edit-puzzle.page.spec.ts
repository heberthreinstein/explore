import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPuzzlePage } from './edit-puzzle.page';

describe('EditPuzzlePage', () => {
  let component: EditPuzzlePage;
  let fixture: ComponentFixture<EditPuzzlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPuzzlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
