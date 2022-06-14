import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Example1Component } from './example/example1.component';  
import { Example2Module } from './example2/example2.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { TuiRootModule } from '@taiga-ui/core';
import { ItemMenuComponent } from './shared/item-menu/item-menu.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; 
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './example2/business/user/User.effect';
@NgModule({
  declarations: [
    AppComponent,
    Example1Component,
    ItemMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    FileUploadModule,	
    TuiRootModule,
    Example2Module,
    EffectsModule.forRoot(),
    StoreModule.forRoot({}), 
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }), StoreModule.forRoot(reducers, { metaReducers }), !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
