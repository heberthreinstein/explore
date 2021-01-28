import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImagePuzzlePage } from './list-image-puzzle.page';

describe('ListImagePuzzlePage', () => {
  let component: ListImagePuzzlePage;
  let fixture: ComponentFixture<ListImagePuzzlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImagePuzzlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImagePuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
