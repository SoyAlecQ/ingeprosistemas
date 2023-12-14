import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLpComponent } from './footer-lp.component';

describe('FooterLpComponent', () => {
  let component: FooterLpComponent;
  let fixture: ComponentFixture<FooterLpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterLpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterLpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
