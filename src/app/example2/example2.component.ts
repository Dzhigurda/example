import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, ChangeThemeGUI, GUI } from './business';
import { MicroModalService } from './micro-modal/micro-modal.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./common.scss', './example2.component.scss']
})
export class Example2Component implements OnInit {

  GUI!: GUI;
  constructor(private store: Store<AppState>, private modal: MicroModalService, private userService: UserService) { }

  ngOnInit(): void {
    this.store.select((state) => state.gui).subscribe(gui => {
      console.log(gui);
      this.GUI = gui;
    })
    this.userService.getAll().subscribe();
  }
 
  changeTheme(theme: any) {
    const isDark = theme.target.checked;
    this.store.dispatch(new ChangeThemeGUI({theme: isDark ? 'dark' : 'light'}))
  }
  openModal(tmp: TemplateRef<Component>) {
    this.modal.open(tmp);
  }

  closeModal() {
    this.modal.close();
  }
}
