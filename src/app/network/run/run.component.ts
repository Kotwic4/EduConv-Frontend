import {Component, OnDestroy, OnInit} from '@angular/core';
import * as NetworkActions from '../store/network.actions';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {LearnedNetwork} from '../shared/learned-network.model';
import {HeaderControl} from '../header/header-control.interface';
import {NetworkOutput} from '../shared/network-output.model';
import {HiddenLayer} from '../shared/hidden-layers/hidden-layer/layers/hidden-layer.model';

@Component({
    selector: 'app-run',
    templateUrl: './run.component.html',
    styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public id: number;
    public processing: boolean;
    public results: NetworkOutput;
    public network: LearnedNetwork;

    public controls: HeaderControl[] = [
        {
            callback: function () {
                this.store.dispatch(new NetworkActions.RunNetwork());
            }.bind(this),
            tooltip: 'Run',
            icon: 'fa-play',
            disabled: () => {
                return (this.processing || !this.network || !this.network.input);
            }
        }
    ];

    constructor(
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute
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
                            this.processing = data.processing;
                            this.network = <LearnedNetwork>data.networkInUsage;
                            this.results = data.networkRunResult;
                        }
                    );
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
