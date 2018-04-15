import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NetworkComponent} from './network/network.component';

const appRoutes: Routes = [
  { path: '', component: NetworkComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
