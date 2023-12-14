import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaComputadorasComponent } from './venta-computadoras.component';

describe('VentaComputadorasComponent', () => {
  let component: VentaComputadorasComponent;
  let fixture: ComponentFixture<VentaComputadorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentaComputadorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaComputadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
