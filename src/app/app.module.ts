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
    StoreModule.forRoot({}), 
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
