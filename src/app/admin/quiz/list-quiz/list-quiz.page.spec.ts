import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuizPage } from './list-quiz.page';

describe('ListQuizPage', () => {
  let component: ListQuizPage;
  let fixture: ComponentFixture<ListQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuizPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
