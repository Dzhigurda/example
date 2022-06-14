import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddUser, AppState, GenderType, RoleType, UserDTO } from '../business';
import { MicroModalService } from '../micro-modal/micro-modal.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['../common.scss', './add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>("", [Validators.required, Validators.minLength(3)]),
    gender: new FormControl<GenderType>("MAN", [Validators.required]),
    role: new FormControl<RoleType>("Guest", [Validators.required]),
  })

  private sub$: Subscription[] = [];
  set sub(sub: Subscription) {
    this.sub$.push(sub);
  }
  constructor(
    private store: Store<AppState>,
    private modal: MicroModalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  onAdd() {
    if (!this.form.valid) return;
    const userFormDTO = this.form.getRawValue() as UserDTO;
    //this.store.dispatch(new AddUser(userFormDTO));
    this.userService.put(userFormDTO).subscribe({
      next: () => {
        this.modal.close();
      },
      error: () => {
        alert("Error");
      }
    })
  }

  ngOnDestroy(): void {
    this.sub$.forEach(s => s.unsubscribe());
  }
}
