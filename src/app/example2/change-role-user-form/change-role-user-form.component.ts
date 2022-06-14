import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subject, take, takeUntil } from 'rxjs';
import { AppState, ChangeUserRole, RoleType, UserDTO, UserRoleFormDTO } from '../business';
import { selectUserByID } from '../business/user/User.select';
import { MicroModalService } from '../micro-modal/micro-modal.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-role-user-form',
  templateUrl: './change-role-user-form.component.html',
  styleUrls: ['../common.scss', './change-role-user-form.component.scss']
})
export class ChangeRoleUserFormComponent implements OnInit, OnDestroy {

  iam = 0;
  form = new FormGroup({
    id: new FormControl<number>(0, [Validators.required]),
    role: new FormControl<RoleType>("Guest", [Validators.required]),
  });

  @Input()
  user!: UserDTO;
  destroy$ = new Subject<void>();
  constructor(private store: Store<AppState>, private modal: MicroModalService, private service: UserService) { }

  ngOnInit(): void {

    this.store.select(selectUserByID(this.user!.id))
      .pipe(take(1))
      .subscribe(user => {
        this.form.setValue(user!.getModelForRole());
      })

    this.form.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    ).subscribe(r => {
      this.onSave();
    })
  }

  onSave() {
    if (!this.form.valid) return;
    const userFormDTO = this.form.getRawValue() as UserRoleFormDTO;
    this.store.dispatch(new ChangeUserRole(userFormDTO));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
