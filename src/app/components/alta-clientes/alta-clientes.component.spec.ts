import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaClientesComponent } from './alta-clientes.component';

describe('AltaClientesComponent', () => {
  let component: AltaClientesComponent;
  let fixture: ComponentFixture<AltaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
