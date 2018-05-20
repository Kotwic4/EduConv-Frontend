import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import {HeaderComponent} from './header/header.component';
import {NetworkComponent} from './network.component';
import {InputLayerComponent} from './shared/input-layer/input-layer.component';
import {HiddenLayersComponent} from './shared/hidden-layers/hidden-layers.component';
import {OutputLayerComponent} from './shared/output-layer/output-layer.component';
import {InputImageComponent} from './shared/input-layer/input-image/input-image.component';
import {ResultsComponent} from './shared/output-layer/results/results.component';
import {HiddenLayerComponent} from './shared/hidden-layers/hidden-layer/hidden-layer.component';
import {NeuroneComponent} from './shared/hidden-layers/hidden-layer/neurone/neurone.component';
import { ModelComponent } from './model/model.component';
import { LearnComponent } from './learn/learn.component';
import { RunComponent } from './run/run.component';
import {RouterModule} from '@angular/router';
import {NetworkRoutingModule} from './network-routing.module';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HiddenLayersService} from './shared/hidden-layers/hidden-layers.service';
import {Conv2dLayerComponent} from './shared/hidden-layers/hidden-layer/layers/conv2d-layer/conv2d-layer.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatSelectModule,
        RouterModule,
        NetworkRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        NetworkComponent,
        HeaderComponent,
        InputLayerComponent,
        HiddenLayersComponent,
        OutputLayerComponent,
        InputImageComponent,
        ResultsComponent,
        HiddenLayerComponent,
        NeuroneComponent,
        ModelComponent,
        LearnComponent,
        RunComponent,
        HomeComponent,
        Conv2dLayerComponent
    ],
    providers: [
        HiddenLayersService
    ]
})
export class NetworkModule {
}
