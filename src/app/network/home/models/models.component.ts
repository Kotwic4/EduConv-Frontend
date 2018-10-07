import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LearnedNetworkInfo} from '../../shared/learned-network-info.model';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as NetworkActions from '../../store/network.actions';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatTableDataSource} from '@angular/material';


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

    displayedColumns = ['id', 'dataset', 'progress', 'actions'];
    dataSource: MatTableDataSource<LearnedNetworkInfo>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

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

                    if (data.learnedNetworks) {
                        this.dataSource = new MatTableDataSource<LearnedNetworkInfo>(data.learnedNetworks);
                        setTimeout(() => this.dataSource.paginator = this.paginator);
                    }
                }
            );
    }

    refresh() {
        this.learnedNetworks = null;
        this.store.dispatch(new NetworkActions.FetchAllLearnedNetworks());
    }
}
