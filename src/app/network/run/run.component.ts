import {Component, OnDestroy, OnInit} from '@angular/core';
import * as NetworkActions from '../store/network.actions';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {LearnedNetwork} from '../shared/learned-network.model';
import * as _ from 'lodash';
import {HeaderControl} from '../header/header-control.interface';

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
    public imageLoaded = false;

    public controls: HeaderControl[] = [
        {
            callback: function () {
                this.running = true;
                this.store.dispatch(new NetworkActions.RunNetwork());
            }.bind(this),
            tooltip: "Run",
            icon: "fa-play",
            disabled: () => {
                return (this.processing || !this.imageLoaded);
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

                            if (network && network.input) {
                                this.imageLoaded = true;
                            }
                            else {
                                this.imageLoaded = false;
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
