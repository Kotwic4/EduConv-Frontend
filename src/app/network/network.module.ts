import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {NetworkComponent} from './network.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NetworkComponent,
    HeaderComponent
  ]
})
export class NetworkModule { }
