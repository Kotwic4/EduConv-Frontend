import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import * as NetworkActions from '../store/network.actions';

@Component({
    selector: 'app-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit, OnDestroy {
    public network: UnlearnedNetwork;
    public loading: boolean;
    public saving = false;
    private subscription: Subscription;
    public saveModel = function() {
        this.saving = true;
        this.store.dispatch(new NetworkActions.ModelNetwork());
    }.bind(this);

    constructor(
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.store.dispatch(new NetworkActions.StartModelingNetwork());

        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.network = <UnlearnedNetwork>data.networkInUsage;

                    this.loading = data.savingNetwork;

                    if (!this.loading && this.saving) {
                        this.router.navigate(['/learn', this.network.id]);
                    }
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
