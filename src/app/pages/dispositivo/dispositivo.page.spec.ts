import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoPage } from './dispositivo.page';

describe('DispositivoPage', () => {
  let component: DispositivoPage;
  let fixture: ComponentFixture<DispositivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
