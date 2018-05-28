import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import * as NetworkActions from '../store/network.actions';
import {HeaderControl} from '../header/header-control.interface';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';

@Component({
    selector: 'app-learn',
    templateUrl: './learn.component.html',
    styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
    public id: number;
    public processing;
    public learning = false;
    public layers = [];
    private subscription: Subscription;

    public controls: HeaderControl[] = [
        {
            callback: function() {
                this.learning = true;
                this.store.dispatch(new NetworkActions.LearnNetwork(this.id));
            }.bind(this),
            tooltip: "Learn",
            icon: "fa-leanpub",
            disabled: () => {
                return this.processing;
            }
        }
    ];

    constructor(
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];

                this.store.dispatch(new NetworkActions.FetchUnlearnedNetwork(this.id));

                this.subscription = this.store.select('network')
                    .subscribe(
                        data => {
                            this.processing = data.processing;

                            const network = <UnlearnedNetwork>data.networkInUsage;
                            if (network) {
                                this.layers = network.layers;
                            }

                            if (!this.processing && this.learning && !data.processingError) {
                                this.router.navigate(['/run', this.id]);
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
