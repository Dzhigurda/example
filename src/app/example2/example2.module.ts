import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Example2Component } from './example2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store'; 
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { ChangeRoleUserFormComponent } from './change-role-user-form/change-role-user-form.component';
import { ChangeThemeComponent } from './change-theme/change-theme.component'; 
import { reducer as GUIReducer } from './business/gui/GUI.reducer';
import { reducer as UserReducer } from './business/user/User.reducer';
import { reducer as CurrentUserreducer } from './business/user/CurrentUser.reducer';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { TuiForModule } from '../shared/for';
import { UserPrviewComponent } from './header/user-prview/user-prview.component';
import { MicroModalComponent } from './micro-modal/micro-modal.component';
import { UserCounterComponent } from './user-counter/user-counter.component';
import {TuiRingChartModule} from '@taiga-ui/addon-charts';
import {TuiDropdownContextModule} from '@taiga-ui/kit';
import {TuiPortalModule} from '@taiga-ui/cdk';
import { UserCardComponent } from './user-card/user-card.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './business/user/User.effect';

@NgModule({
  declarations: [
    HeaderComponent, Example2Component, AddUserFormComponent, EditUserFormComponent, ChangeRoleUserFormComponent, ChangeThemeComponent, UserListComponent, UserListItemComponent, UserPrviewComponent, MicroModalComponent, UserCounterComponent, UserCardComponent
  ],
  exports: [Example2Component],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,  
    TuiForModule, 
    ReactiveFormsModule,
    TuiRingChartModule,
    TuiDropdownContextModule,  
    TuiPortalModule,
    StoreModule.forFeature("users", UserReducer),
    StoreModule.forFeature("gui", GUIReducer), 
    StoreModule.forFeature("current_user", CurrentUserreducer),
    EffectsModule.forFeature([UserEffect]),
  ]
})
export class Example2Module { }
