import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {ModelComponent} from './model/model.component';
import {LearnComponent} from './learn/learn.component';
import {RunComponent} from './run/run.component';
import {HomeComponent} from './home/home.component';
import {NetworkComponent} from './network.component';
import {ModelsComponent} from './home/models/models.component';
import {SchemesComponent} from './home/schemes/schemes.component';
import {DatasetsComponent} from './home/datasets/datasets.component';
import {DatasetComponent} from './home/datasets/dataset/dataset.component';
import {DatasetInfoComponent} from './home/datasets/dataset-info/dataset-info.component';

const routes: Routes = [
    {
        path: '', component: NetworkComponent, children: [
            {
                path: 'home',
                component: HomeComponent,
                children: [
                    {
                        path: 'models',
                        component: SchemesComponent
                    },
                    {
                        path: 'trained_models',
                        component: ModelsComponent
                    },
                    {
                        path: 'datasets',
                        component: DatasetsComponent
                    },
                    {
                        path: 'datasets/:id/info',
                        component: DatasetInfoComponent
                    },
                    {
                        path: 'datasets/:id/images/:imageSet',
                        component: DatasetComponent
                    },
                    { path: '', redirectTo: 'models', pathMatch: 'full' }
                ]
            },
            {
                path: 'model',
                component: ModelComponent,
            },
            {
                path: 'model/:id',
                component: ModelComponent,
            },
            {
                path: 'train/:id',
                component: LearnComponent
            },
            {
                path: 'run/:id',
                component: RunComponent
            },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NetworkRoutingModule {
}
