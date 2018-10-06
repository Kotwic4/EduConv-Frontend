import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as NetworkActions from '../../store/network.actions';
import {Subscription} from 'rxjs/Subscription';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DatasetInfo} from '../../shared/dataset-info.model';

@Component({
    selector: 'app-datasets',
    templateUrl: './datasets.component.html',
    styleUrls: ['./datasets.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('*' , style({ opacity: 1 })),
            state('void', style({ opacity: 0 })),
            transition('* <=> void', animate('.3s ease-in')),
        ])
    ]
})
export class DatasetsComponent implements OnInit {
    private subscription: Subscription;
    public datasets: DatasetInfo[];

    displayedColumns = ['id', 'name', 'imagesAmount', 'imagesSize', 'actions'];
    dataSource: MatTableDataSource<DatasetInfo>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.store.dispatch(new NetworkActions.FetchDatasets());

        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.datasets = [
                        new DatasetInfo(1, 'mnist', 123, 123, 100, 100, 1, ['1', '2', '3'])
                    ];
                    // this.datasets = data.datasets;

                    // if (data.datasets) {
                        this.dataSource = new MatTableDataSource<DatasetInfo>(this.datasets);
                        setTimeout(() => this.dataSource.paginator = this.paginator);
                    // }
                }
            );
    }
}
