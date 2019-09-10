import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlesPage } from './puzzles.page';

describe('PuzzlesPage', () => {
  let component: PuzzlesPage;
  let fixture: ComponentFixture<PuzzlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzlesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
