import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, UserDTO } from '../business';
import { selectUserByID } from '../business/user/User.select';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }
  sub!: Subscription;

  @Input()
  user!: UserDTO;

  persone!: UserDTO;
  ngOnInit(): void {
    this.sub = this.store.select(selectUserByID(this.user!.id!)).subscribe(persone => {
      this.persone = persone!;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
