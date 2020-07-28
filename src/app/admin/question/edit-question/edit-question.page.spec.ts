import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionPage } from './edit-question.page';

describe('EditQuestionPage', () => {
  let component: EditQuestionPage;
  let fixture: ComponentFixture<EditQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
