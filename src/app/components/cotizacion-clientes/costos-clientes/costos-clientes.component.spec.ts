import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostosClientesComponent } from './costos-clientes.component';

describe('CostosClientesComponent', () => {
  let component: CostosClientesComponent;
  let fixture: ComponentFixture<CostosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostosClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
