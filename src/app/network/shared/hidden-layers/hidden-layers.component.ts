import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import * as fromApp from '../../../store/app.reducers';

@Component({
    selector: 'app-hidden-layers',
    templateUrl: './hidden-layers.component.html',
    styleUrls: ['./hidden-layers.component.scss']
})
export class HiddenLayersComponent implements OnInit, OnDestroy {
    @Input() readonly;
    subscription: Subscription;
    hiddenLayers = [];

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.hiddenLayers = _.cloneDeep(data.networkInUsage.layers);
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
