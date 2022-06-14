import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../../business';

@Component({
  selector: 'app-user-prview',
  templateUrl: './user-prview.component.html',
  styleUrls: ['./user-prview.component.scss']
})
export class UserPrviewComponent implements OnInit {

  private _user?: User;

  @Input()
  set user(user: User | null | undefined) {
    if(!user) return;
    this.setBackground(user.avatar);
    this._user = user;
  }
 
  get user() {
    return this._user!;
  }

  @Output()
  open = new EventEmitter<User>();

  @ViewChild("avatar", { static: true })
  avatar!: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
  }

  setBackground(url = '/assets/user_default.png') {
    this.avatar.nativeElement.style.background = `url(${url}) 50% 50% no-repeat #fff`;
  }
}
