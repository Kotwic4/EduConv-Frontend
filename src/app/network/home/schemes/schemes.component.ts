import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as NetworkActions from '../../store/network.actions';
import {UnlearnedNetwork} from '../../shared/unlearned-network.model';
import {Subscription} from 'rxjs/Subscription';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
    selector: 'app-schemes',
    templateUrl: './schemes.component.html',
    styleUrls: ['./schemes.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('*' , style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition('* <=> void', animate('.3s ease-in')),
        ])
    ]
})
export class SchemesComponent implements OnInit {
    private subscription: Subscription;
    public unlearnedNetworks: UnlearnedNetwork[];

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new NetworkActions.FetchAllUnlearnedNetworks());

        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.unlearnedNetworks = data.unlearnedNetworks;
                }
            );
    }

    addBaseOn(event, id: number) {
        this.router.navigate(['/scheme', id]);

        event.stopPropagation();
    }
}
