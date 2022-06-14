import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../business';
import { selectUsersCount, UserCounter } from '../business/user/User.select';
import { sum } from '@taiga-ui/cdk';

@Component({
  selector: 'app-user-counter',
  templateUrl: './user-counter.component.html',
  styleUrls: ['../common.scss', './user-counter.component.scss']
})
export class UserCounterComponent implements OnInit {

  counter?: UserCounter;
  private readonly labelsGender = ['Man', 'Woman'];
  valueGender = [0, 0];
  private readonly labelsRole = ['Admins', 'Managers', 'Guests'];
  valueRole = [0, 0, 0];
  sum = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectUsersCount).subscribe(counter => {
      this.counter = counter;
      this.valueGender = [counter.man, counter.woman];
      this.valueRole = [counter.admin, counter.manager, counter.guest];
      this.sum = counter.all;
    })
  }

  getValueGender(index: number): number {
    return Number.isNaN(index) ? this.sum : this.valueGender[index];
  }
  getValueRole(index: number): number {
    return Number.isNaN(index) ? this.sum : this.valueRole[index];
  }

  getLabelGender(index: number): string {
    return Number.isNaN(index) ? 'Total' : this.labelsGender[index];
  }
  getLabelRole(index: number): string {
    return Number.isNaN(index) ? 'Total' : this.labelsRole[index];
  }
}
