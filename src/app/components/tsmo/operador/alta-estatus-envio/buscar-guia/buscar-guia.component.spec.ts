import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarGuiaComponent } from './buscar-guia.component';

describe('BuscarGuiaComponent', () => {
  let component: BuscarGuiaComponent;
  let fixture: ComponentFixture<BuscarGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarGuiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
