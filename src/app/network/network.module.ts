import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {NetworkComponent} from './network.component';
import { InputLayerComponent } from './input-layer/input-layer.component';
import { HiddenLayersComponent } from './hidden-layers/hidden-layers.component';
import { OutputLayerComponent } from './output-layer/output-layer.component';
import { InputImageComponent } from './input-layer/input-image/input-image.component';
import { ResultsComponent } from './output-layer/results/results.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NetworkComponent,
    HeaderComponent,
    InputLayerComponent,
    HiddenLayersComponent,
    OutputLayerComponent,
    InputImageComponent,
    ResultsComponent
  ]
})
export class NetworkModule { }
