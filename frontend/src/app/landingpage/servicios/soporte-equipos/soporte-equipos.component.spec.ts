import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteEquiposComponent } from './soporte-equipos.component';

describe('SoporteEquiposComponent', () => {
  let component: SoporteEquiposComponent;
  let fixture: ComponentFixture<SoporteEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoporteEquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoporteEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
