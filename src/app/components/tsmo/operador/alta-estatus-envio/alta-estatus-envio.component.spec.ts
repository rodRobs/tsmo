import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEstatusEnvioComponent } from './alta-estatus-envio.component';

describe('AltaEstatusEnvioComponent', () => {
  let component: AltaEstatusEnvioComponent;
  let fixture: ComponentFixture<AltaEstatusEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEstatusEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEstatusEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
