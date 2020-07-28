import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPuzzlePage } from './list-puzzle.page';

describe('ListPuzzlePage', () => {
  let component: ListPuzzlePage;
  let fixture: ComponentFixture<ListPuzzlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPuzzlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
