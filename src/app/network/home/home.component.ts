import {Component, OnInit} from '@angular/core';

import * as fromApp from '../../store/app.reducers';
import * as NetworkActions from '../store/network.actions';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {LearnedNetworkInfo} from '../shared/learned-network-info.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private subscription: Subscription;
    public unlearnedNetworks: UnlearnedNetwork[];
    public learnedNetworks: LearnedNetworkInfo[];

    constructor(
        private store: Store<fromApp.AppState>
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new NetworkActions.FetchAllUnlearnedNetworks());
        this.store.dispatch(new NetworkActions.FetchAllLearnedNetworks());

        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.unlearnedNetworks = data.unlearnedNetworks;
                    this.learnedNetworks = data.learnedNetworks;
                }
            );
    }

}
