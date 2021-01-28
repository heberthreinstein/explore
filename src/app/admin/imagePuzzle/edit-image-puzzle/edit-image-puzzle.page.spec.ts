import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImagePuzzlePage } from './edit-image-puzzle.page';

describe('EditImagePuzzlePage', () => {
  let component: EditImagePuzzlePage;
  let fixture: ComponentFixture<EditImagePuzzlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImagePuzzlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImagePuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
