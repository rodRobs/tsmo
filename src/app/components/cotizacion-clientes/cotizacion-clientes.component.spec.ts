import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionClientesComponent } from './cotizacion-clientes.component';

describe('CotizacionClientesComponent', () => {
  let component: CotizacionClientesComponent;
  let fixture: ComponentFixture<CotizacionClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
