import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionFormacionComponent } from './capacitacion-formacion.component';

describe('CapacitacionFormacionComponent', () => {
  let component: CapacitacionFormacionComponent;
  let fixture: ComponentFixture<CapacitacionFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapacitacionFormacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapacitacionFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
