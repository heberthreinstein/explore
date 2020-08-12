import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizPage } from './edit-quiz.page';

describe('EditQuizPage', () => {
  let component: EditQuizPage;
  let fixture: ComponentFixture<EditQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuizPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
