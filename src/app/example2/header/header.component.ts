import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { AppState, User } from '../business';
import { selectCurrentUser } from '../business/user/User.select';
import { MicroModalService } from '../micro-modal/micro-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$: Observable<User | undefined>;

  user!: User;

  constructor(private store: Store<AppState>,
    private modal: MicroModalService) {
    this.user$ = this.store.select(selectCurrentUser)
      .pipe(
        filter(r => !!r)
      )
  }

  openSettingModal(tmp: any, user: User) {
    this.user = user;
    this.modal.open(tmp);
  }

}
