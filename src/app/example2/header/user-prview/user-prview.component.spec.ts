import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrviewComponent } from './user-prview.component';

describe('UserPrviewComponent', () => {
  let component: UserPrviewComponent;
  let fixture: ComponentFixture<UserPrviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPrviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPrviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
