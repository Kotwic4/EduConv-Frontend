import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../../../../store/app.reducers';
import {LearnedNetwork} from '../../learned-network.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    labels: String[];
    results: Number[];

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    const network = (<LearnedNetwork>data.networkInUsage);

                    if (network) {
                        this.labels = _.cloneDeep(network.labels);
                    }

                    if (data.networkRunResult) {
                        this.results = data.networkRunResult.classification;
                    } else {
                        this.results = [];
                    }
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
