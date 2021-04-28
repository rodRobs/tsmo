import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParrafoComponent } from './parrafo.component';

describe('ParrafoComponent', () => {
  let component: ParrafoComponent;
  let fixture: ComponentFixture<ParrafoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParrafoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
