import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDescarteComponent } from './tipo-descarte.component';

describe('TipoDescarteComponent', () => {
  let component: TipoDescarteComponent;
  let fixture: ComponentFixture<TipoDescarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDescarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDescarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
