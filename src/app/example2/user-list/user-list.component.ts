import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, mergeMap, mergeWith, Observable, Subject, switchMap, tap } from 'rxjs';
import { AppState, ChangeCurrentUser, ClearUserAvatar, User } from '../business';
import { selectCurrenUserId, selectUsers } from '../business/user/User.select';
import { MicroModalService } from '../micro-modal/micro-modal.service';
import { UserService } from '../user.service';


const SORT_BY_ROLE = (a: any, b: any) => b.role > a.role ? -1 : 1;
const SORT_BY_NAME = (a: any, b: any) => b.name > a.name ? -1 : 1;
const SORT_BY_ID = (a: any, b: any) => b.id > a.id ? -1 : 1;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['../common.scss', './user-list.component.scss']
})
export class UserListComponent implements OnInit {

  iam = 0;
  users$: Observable<User[]>;
  sortStrategies = [{
    name: 'по ролям',
    fn: SORT_BY_ROLE
  }, {
    name: 'по имени',
    fn: SORT_BY_NAME
  }, {
    name: 'по номеру',
    fn: SORT_BY_ID
  },
  ];

  resortStrategy = [{
    name: "от меньшего к большему",
    fn: (state: any[]) => state,
  }, {
    name: "от большего к муньшему",
    fn: (state: any[]) => state.reverse(),
  }]
  currentStrategyIndex = 0;
  currentResortStrategyIndex = 0;
  selectUser?: User;
  resort = new BehaviorSubject<boolean>(true);
  constructor(private store: Store<AppState>, private modal: MicroModalService, private userService: UserService) {
    this.users$ =
      this.resort.pipe(
        switchMap(() => this.store.select(selectUsers)),
        map(r => {
          return this.getResortStrategy().fn(
            Array.from(r).sort(this.getSortStrategy().fn)
          );
        }));
  }

  ngOnInit(): void {
    this.store.select(selectCurrenUserId).subscribe(iam => this.iam = iam)
  }

  getSortStrategy() {
    return this.sortStrategies[this.currentStrategyIndex];
  }
  getResortStrategy() {
    return this.resortStrategy[this.currentResortStrategyIndex];
  }
  nextStrategy() {
    this.currentStrategyIndex++;
    if (this.currentStrategyIndex === this.sortStrategies.length)
      this.currentStrategyIndex = 0;
    this.resort.next(true);
  }
  nextStrategyResort() {
    this.currentResortStrategyIndex++;
    if (this.currentResortStrategyIndex === this.resortStrategy.length)
      this.currentResortStrategyIndex = 0;
    this.resort.next(true);
  }

  openModal(tmp: TemplateRef<Component>) {
    event?.preventDefault();
    this.modal.open(tmp);
  }

  changeCurrentUser() {
    if (!this.selectUser) return;
    this.store.dispatch(new ChangeCurrentUser(this.selectUser.id))

  }
  removeAvatar() {
    if (!this.selectUser) return;
    const id = this.selectUser.id;
    this.userService.clearAvatar(id).subscribe(_ => {
      console.log("Avatar removed");
    })  
  }

  removeUser() {
    this.selectUser = undefined;
  }

  closeModal() {
    this.modal.close();
  }

}
