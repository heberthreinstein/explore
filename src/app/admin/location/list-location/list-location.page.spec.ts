import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocationPage } from './list-location.page';

describe('ListLocationPage', () => {
  let component: ListLocationPage;
  let fixture: ComponentFixture<ListLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
