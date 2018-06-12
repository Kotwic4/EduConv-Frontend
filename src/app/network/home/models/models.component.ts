import {Component, OnInit} from '@angular/core';
import {LearnedNetworkInfo} from '../../shared/learned-network-info.model';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as NetworkActions from '../../store/network.actions';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('*' , style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition('* <=> void', animate('.3s ease-in')),
        ])
    ]
})
export class ModelsComponent implements OnInit {
    private subscription: Subscription;
    public learnedNetworks: LearnedNetworkInfo[];

    constructor(
        private store: Store<fromApp.AppState>
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new NetworkActions.FetchAllLearnedNetworks());

        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.learnedNetworks = data.learnedNetworks;
                }
            );
    }
}
