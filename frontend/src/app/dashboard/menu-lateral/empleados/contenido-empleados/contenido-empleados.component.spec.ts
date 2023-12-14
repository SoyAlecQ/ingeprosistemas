import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoEmpleadosComponent } from './contenido-empleados.component';

describe('ContenidoEmpleadosComponent', () => {
  let component: ContenidoEmpleadosComponent;
  let fixture: ComponentFixture<ContenidoEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenidoEmpleadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenidoEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
