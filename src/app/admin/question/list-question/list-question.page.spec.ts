import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionPage } from './list-question.page';

describe('ListQuestionPage', () => {
  let component: ListQuestionPage;
  let fixture: ComponentFixture<ListQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
