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

const routes: Routes = [
    {
        path: '', component: NetworkComponent, children: [
            {
                path: 'home',
                component: HomeComponent,
                children: [
                    {
                        path: 'schemes',
                        component: SchemesComponent
                    },
                    {
                        path: 'models',
                        component: ModelsComponent
                    },
                    {
                        path: 'datasets',
                        component: DatasetsComponent
                    },
                    {
                        path: 'datasets/:id',
                        component: DatasetComponent
                    },
                    { path: '', redirectTo: 'schemes', pathMatch: 'full' }
                ]
            },
            {
                path: 'scheme',
                component: ModelComponent,
            },
            {
                path: 'scheme/:id',
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
