import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Example1Component } from './example/example1.component';
import { Example2Component } from './example2/example2.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'upload'},
  {path: 'upload', pathMatch: 'full', component: Example1Component},
  {path: 'state',  pathMatch: 'full', component: Example2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
