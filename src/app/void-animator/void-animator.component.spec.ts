import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidAnimatorComponent } from './void-animator.component';

describe('VoidAnimatorComponent', () => {
  let component: VoidAnimatorComponent;
  let fixture: ComponentFixture<VoidAnimatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoidAnimatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoidAnimatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
