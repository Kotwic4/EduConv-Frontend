import {Component, OnDestroy, OnInit} from '@angular/core';
import * as NetworkActions from '../store/network.actions';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {LearnedNetwork} from '../shared/learned-network.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-run',
    templateUrl: './run.component.html',
    styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    public id: number;
    public network: LearnedNetwork;
    public loading: boolean;
    public imageLoaded = false;
    public running: boolean;
    public run = function () {
        if (this.imageLoaded) {
            this.store.dispatch(new NetworkActions.RunNetwork());
        }
    }.bind(this);

    constructor(
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];

                this.store.dispatch(new NetworkActions.FetchLearnedNetwork(this.id));

                this.subscription = this.store.select('network')
                    .subscribe(
                        data => {
                            this.loading = data.fetchingNetwork;
                            this.running = data.runningNetwork;

                            if (!this.loading) {
                                this.network = <LearnedNetwork>data.networkInUsage;

                                if (this.network && this.network.input) {
                                    this.imageLoaded = true;
                                }
                                else {
                                    this.imageLoaded = false;
                                }
                            }
                        }
                    );
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
