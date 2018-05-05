import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../../store/app.reducers';
import * as NetworkActions from '../store/network.actions';

@Component({
    selector: 'app-hidden-layers',
    templateUrl: './hidden-layers.component.html',
    styleUrls: ['./hidden-layers.component.scss']
})
export class HiddenLayersComponent implements OnInit {
    subscription: Subscription;
    hiddenLayers = [];

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.hiddenLayers = data.hiddenLayers;
                }
            );
    }

    onLayerAdd() {
        this.store.dispatch(new NetworkActions.HiddenLayerAdd());
    }
}
