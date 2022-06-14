import { Component, ComponentRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../business';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['../common.scss', './user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {

  @Input()
  user?: User;

  @Input()
  iam = false;

  @ViewChild('avatar', {static: true})
  avatar!: ElementRef<HTMLImageElement>;
  constructor() { }

  ngOnInit(): void {
    this.setBackground(this.user?.avatar);
  }

  setBackground(url = '/assets/user_default.png') {
    this.avatar.nativeElement.style.background = `url(${url}) 50% 50% no-repeat #fff`;
  }
}
