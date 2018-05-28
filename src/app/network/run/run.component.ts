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
    public running = false;
    public image: string;
    public layers: HiddenLayer[];
    public results: NetworkOutput;
    public labels: string[];

    public controls: HeaderControl[] = [
        {
            callback: function () {
                this.running = true;
                this.store.dispatch(new NetworkActions.RunNetwork());
            }.bind(this),
            tooltip: 'Run',
            icon: 'fa-play',
            disabled: () => {
                return (this.processing || !this.image);
            }
        }
    ];

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
                            this.processing = data.processing;

                            if (!this.processing && this.running) {
                                this.running = false;
                            }

                            const network = <LearnedNetwork>data.networkInUsage;
                            if (network) {
                                this.layers = network.layers;
                                this.image = network.input;
                                this.labels = network.labels;
                            }

                            const results = data.networkRunResult;
                            if (results) {
                                this.results = results;
                            }
                            else {
                                this.results = null;
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
