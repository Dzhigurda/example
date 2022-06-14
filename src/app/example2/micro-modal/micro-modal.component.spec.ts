import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroModalComponent } from './micro-modal.component';

describe('MicroModalComponent', () => {
  let component: MicroModalComponent;
  let fixture: ComponentFixture<MicroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
