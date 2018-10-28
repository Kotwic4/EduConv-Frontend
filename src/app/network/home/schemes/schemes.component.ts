import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as NetworkActions from '../../store/network.actions';
import {UnlearnedNetwork} from '../../shared/unlearned-network.model';
import {Subscription} from 'rxjs/Subscription';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {interval} from 'rxjs/observable/interval';
import {TABLE_REFRESH_INTERVAL} from '../../network.consts';

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
export class SchemesComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private refreshingSubscription: Subscription;
    public unlearnedNetworks: UnlearnedNetwork[];

    displayedColumns = ['id', 'name', 'actions'];
    dataSource: MatTableDataSource<UnlearnedNetwork>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private store: Store<fromApp.AppState>
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new NetworkActions.FetchAllUnlearnedNetworks());

        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.unlearnedNetworks = data.unlearnedNetworks;

                    if (data.unlearnedNetworks) {
                        this.dataSource = new MatTableDataSource<UnlearnedNetwork>(data.unlearnedNetworks);
                        setTimeout(() => {
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                        });
                    }
                }
            );

        this.refreshingSubscription = interval(TABLE_REFRESH_INTERVAL).subscribe(() => {
            this.refresh();
        });
    }

    refresh() {
        this.store.dispatch(new NetworkActions.FetchAllUnlearnedNetworks());
    }

    ngOnDestroy() {
        this.refreshingSubscription.unsubscribe();
    }
}
