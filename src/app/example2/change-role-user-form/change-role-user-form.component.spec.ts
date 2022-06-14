import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRoleUserFormComponent } from './change-role-user-form.component';

describe('ChangeRoleUserFormComponent', () => {
  let component: ChangeRoleUserFormComponent;
  let fixture: ComponentFixture<ChangeRoleUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRoleUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRoleUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
