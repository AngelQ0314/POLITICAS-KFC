import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionComponent } from './estacion.component';

describe('EstacionComponent', () => {
  let component: EstacionComponent;
  let fixture: ComponentFixture<EstacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
