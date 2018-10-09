import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LearnedNetworkInfo} from '../../shared/learned-network-info.model';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as NetworkActions from '../../store/network.actions';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {interval} from 'rxjs/observable/interval';
import {TABLE_REFRESH_INTERVAL} from '../../network.consts';


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
export class ModelsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private refreshingSubscription: Subscription;
    public learnedNetworks: LearnedNetworkInfo[];

    displayedColumns = ['id', 'dataset', 'progress', 'actions'];
    dataSource: MatTableDataSource<LearnedNetworkInfo>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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
                        setTimeout(() => {
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sortingDataAccessor = (item, property) => {
                                switch (property) {
                                    case 'dataset':
                                        return item.dataset.name;
                                    case 'progress':
                                        return item.epochsLearnt / item.epochsToLearn;
                                    default: return item[property];
                                }
                            };
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
        this.store.dispatch(new NetworkActions.FetchAllLearnedNetworks());
    }

    ngOnDestroy() {
        this.refreshingSubscription.unsubscribe();
    }
}
