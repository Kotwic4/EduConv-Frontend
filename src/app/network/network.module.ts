import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import {HeaderComponent} from './header/header.component';
import {NetworkComponent} from './network.component';
import {InputLayerComponent} from './input-layer/input-layer.component';
import {HiddenLayersComponent} from './hidden-layers/hidden-layers.component';
import {OutputLayerComponent} from './output-layer/output-layer.component';
import {InputImageComponent} from './input-layer/input-image/input-image.component';
import {ResultsComponent} from './output-layer/results/results.component';
import {HiddenLayerComponent} from './hidden-layers/hidden-layer/hidden-layer.component';
import {NeuroneComponent} from './hidden-layers/hidden-layer/neurone/neurone.component';
import {SortablejsModule} from 'angular-sortablejs';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatSelectModule,
        SortablejsModule
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
        NeuroneComponent
    ]
})
export class NetworkModule {
}
