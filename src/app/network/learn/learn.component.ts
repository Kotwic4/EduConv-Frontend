import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {Subscription} from 'rxjs/Subscription';
import * as NetworkActions from '../store/network.actions';
import * as _ from 'lodash';

@Component({
    selector: 'app-learn',
    templateUrl: './learn.component.html',
    styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit, OnDestroy {
    public id: number;
    public network: UnlearnedNetwork;
    public loading: boolean;
    public learning = false;
    public submitted = false;
    private subscription: Subscription;
    public learnModel = function() {
        this.submitted = true;
        this.store.dispatch(new NetworkActions.LearnNetwork(this.id));
    }.bind(this);

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
                            this.loading = data.fetchingNetwork;
                            this.learning = data.learningNetwork;

                            if (!this.loading) {
                                // this.network = <UnlearnedNetwork>data.networkInUsage;
                            }

                            if (!this.learning && this.submitted) {
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
