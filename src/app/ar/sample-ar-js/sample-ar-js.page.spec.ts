import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleArJsPage } from './sample-ar-js.page';

describe('SampleArJsPage', () => {
  let component: SampleArJsPage;
  let fixture: ComponentFixture<SampleArJsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleArJsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleArJsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
