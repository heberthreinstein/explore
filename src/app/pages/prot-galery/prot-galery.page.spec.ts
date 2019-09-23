import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtGaleryPage } from './prot-galery.page';

describe('ProtGaleryPage', () => {
  let component: ProtGaleryPage;
  let fixture: ComponentFixture<ProtGaleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtGaleryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtGaleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
