import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestePage } from './teste.page';

describe('TestePage', () => {
  let component: TestePage;
  let fixture: ComponentFixture<TestePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
