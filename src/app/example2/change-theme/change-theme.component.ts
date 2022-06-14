import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, ChangeThemeGUI } from '../business';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeThemeComponent implements OnInit {

  night = false;
  constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.store.select((state) => state.gui).subscribe(r => {
      this.night = r.theme === 'dark';
      this.ref.detectChanges();
    })
    const useDark = window.matchMedia("(prefers-color-scheme: dark)");
    useDark.onchange = (evt: any) => {  
      console.log("Native change theme");
      this.store.dispatch(new ChangeThemeGUI({ theme: !evt.matches ? 'light' : 'dark' }))
    };
  }

  onToggle() {
    console.log("Start change theme");
    this.store.dispatch(new ChangeThemeGUI({ theme: this.night ? 'light' : 'dark' }))
  }

}
