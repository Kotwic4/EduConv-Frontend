import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../../../store/app.reducers';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    subscription: Subscription;
    labels: String[];
    results: Number[];

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.labels = data.labels;
                    this.results = data.results;
                }
            );
    }

}
