import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
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
    public processing;
    public learning = false;
    private subscription: Subscription;

    public learnModel = function() {
        this.learning = true;
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
                            this.processing = data.processing;

                            if (!this.processing && this.learning) {
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
