import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducers';
import * as NetworkActions from '../../../store/network.actions';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DatasetInfo} from '../../../shared/dataset-info.model';

@Component({
    selector: 'app-dataset-info',
    templateUrl: './dataset-info.component.html',
    styleUrls: ['./dataset-info.component.scss']
})
export class DatasetInfoComponent implements OnInit {
    private subscription: Subscription;
    public id: number;
    public dataset: DatasetInfo;
    public LINKS: any[];

    constructor(
        private store: Store<fromApp.AppState>,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.initLinks(this.id);
                this.store.dispatch(new NetworkActions.FetchDataset(this.id));

                this.subscription = this.store.select('network')
                    .subscribe(
                        data => {
                            if (data.dataset) {
                                this.dataset = data.dataset;
                            }
                        }
                    );
            });
    }

    initLinks(id: number) {
        this.LINKS = [
            {
                path: `/home/datasets/${id}/images/train`,
                label: 'Train Images'
            },
            {
                path: `/home/datasets/${id}/images/test`,
                label: 'Test Images'
            },
            {
                path: `/home/datasets/${id}/info`,
                label: 'Info'
            }
        ];
    }
}
