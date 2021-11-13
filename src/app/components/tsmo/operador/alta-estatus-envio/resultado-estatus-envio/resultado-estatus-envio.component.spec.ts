import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoEstatusEnvioComponent } from './resultado-estatus-envio.component';

describe('ResultadoEstatusEnvioComponent', () => {
  let component: ResultadoEstatusEnvioComponent;
  let fixture: ComponentFixture<ResultadoEstatusEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoEstatusEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoEstatusEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
