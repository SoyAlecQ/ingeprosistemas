import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDetallesComponent } from './venta-detalles.component';

describe('VentaDetallesComponent', () => {
  let component: VentaDetallesComponent;
  let fixture: ComponentFixture<VentaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentaDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
