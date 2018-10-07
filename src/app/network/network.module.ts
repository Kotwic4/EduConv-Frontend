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
import {ModelComponent} from './model/model.component';
import {LearnComponent} from './learn/learn.component';
import {RunComponent} from './run/run.component';
import {RouterModule} from '@angular/router';
import {NetworkRoutingModule} from './network-routing.module';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {Conv2dLayerComponent} from './shared/hidden-layers/hidden-layer/layers/conv2d-layer/conv2d-layer.component';
import {DenseLayerComponent} from './shared/hidden-layers/hidden-layer/layers/dense-layer/dense-layer.component';
import {DropoutLayerComponent} from './shared/hidden-layers/hidden-layer/layers/dropout-layer/dropout-layer.component';
import {FlattenLayerComponent} from './shared/hidden-layers/hidden-layer/layers/flatten-layer/flatten-layer.component';
import {MaxPooling2dLayerComponent} from './shared/hidden-layers/hidden-layer/layers/max-pooling2d-layer/max-pooling2d-layer.component';
import {HiddenLayersService} from './shared/hidden-layers/hidden-layer/layers/hidden-layer.service';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSnackBarModule, MatSortModule,
    MatTabsModule
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NeuronsCounterComponent} from './shared/hidden-layers/hidden-layer/neurons-counter/neurons-counter.component';
import {LoaderComponent} from './shared/loader/loader.component';
import {HiddenLayersPlaceholderComponent} from './shared/hidden-layers/hidden-layers-placeholder/hidden-layers-placeholder.component';
import {Ng2ImgToolsModule} from 'ng2-img-tools';
import {LearnSettingsComponent} from './learn/learn-settings/learn-settings.component';
import {SnackBarService} from './shared/snack-bar.service';
import {DeletionConfirmComponent} from './shared/hidden-layers/hidden-layer/layers/deletion-confirm/deletion-confirm.component';
import {SchemesComponent} from './home/schemes/schemes.component';
import {ModelsComponent} from './home/models/models.component';
import {ActivationLayerComponent} from './shared/hidden-layers/hidden-layer/layers/activation-layer/activation-layer.component';
import {AveragePooling2dLayerComponent
} from './shared/hidden-layers/hidden-layer/layers/average-pooling2d-layer/average-pooling2d-layer.component';
import {BatchNormalizationLayerComponent
} from './shared/hidden-layers/hidden-layer/layers/batch-normalization-layer/batch-normalization-layer.component';
import {DatasetsComponent} from './home/datasets/datasets.component';
import {DatasetComponent} from './home/datasets/dataset/dataset.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        RouterModule,
        NetworkRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        Ng2ImgToolsModule,
        MatSliderModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
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
        Conv2dLayerComponent,
        DenseLayerComponent,
        DropoutLayerComponent,
        FlattenLayerComponent,
        MaxPooling2dLayerComponent,
        BatchNormalizationLayerComponent,
        AveragePooling2dLayerComponent,
        ActivationLayerComponent,
        NeuronsCounterComponent,
        LoaderComponent,
        HiddenLayersPlaceholderComponent,
        LearnSettingsComponent,
        DeletionConfirmComponent,
        SchemesComponent,
        ModelsComponent,
        DatasetsComponent,
        DatasetComponent
    ],
    providers: [
        HiddenLayersService,
        SnackBarService,
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ],
    entryComponents: [DeletionConfirmComponent],
})
export class NetworkModule {
}
