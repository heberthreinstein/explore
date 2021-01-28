import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePuzzlePage } from './image-puzzle.page';

describe('ImagePuzzlePage', () => {
  let component: ImagePuzzlePage;
  let fixture: ComponentFixture<ImagePuzzlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePuzzlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
