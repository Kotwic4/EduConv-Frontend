import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {ModelComponent} from './model/model.component';
import {LearnComponent} from './learn/learn.component';
import {RunComponent} from './run/run.component';
import {HomeComponent} from './home/home.component';
import {NetworkComponent} from './network.component';

const routes: Routes = [
    {
        path: '', component: NetworkComponent, children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'model',
                component: ModelComponent,
            },
            {
                path: 'learn',
                component: LearnComponent
            },
            {
                path: 'run',
                component: RunComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NetworkRoutingModule {
}
