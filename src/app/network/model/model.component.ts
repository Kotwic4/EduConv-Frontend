import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import * as NetworkActions from '../store/network.actions';
import {Conv2DLayer} from '../shared/hidden-layers/hidden-layer/layers/conv2d-layer/conv2d-layer.model';
import {HeaderControl} from '../header/header-control.interface';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {SnackBarService, SnackBarType} from '../shared/snack-bar.service';
import {HiddenLayer} from '../shared/hidden-layers/hidden-layer/layers/hidden-layer.model';

@Component({
    selector: 'app-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public processing: boolean;
    public saving = false;
    public layers: HiddenLayer[];
    public id: number;

    public controls: HeaderControl[] = [
        {
            callback: function () {
                this.store.dispatch(new NetworkActions.HiddenLayerAdd(new Conv2DLayer()));
            }.bind(this),
            tooltip: 'Add layer',
            icon: 'fa-plus-square-o',
            disabled: () => {
                return this.processing;
            }
        },

        {
            callback: function () {
                this.saving = true;
                this.store.dispatch(new NetworkActions.ModelNetwork());
            }.bind(this),
            tooltip: 'Save',
            icon: 'fa-floppy-o',
            disabled: () => {
                return (this.processing || !this.layers || this.layers.length === 0);
            }
        }
    ];

    constructor(
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute,
        private router: Router,
        private snackBarService: SnackBarService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                const id = Number(params['id']);
                this.id = id;

                if (id) {
                    this.store.dispatch(new NetworkActions.FetchUnlearnedNetwork(id));

                }
                else {
                    this.store.dispatch(new NetworkActions.FetchUnlearnedNetworkSuccess(new UnlearnedNetwork()));
                }

                this.subscription = this.store.select('network')
                    .subscribe(
                        data => {
                            this.processing = data.processing;

                            const network = <UnlearnedNetwork>data.networkInUsage;
                            if (network) {
                                this.layers = network.layers;
                            }

                            if (!this.processing && this.saving) {
                                this.snackBarService.open(SnackBarType.SUCCESS, 'Model successfully saved');

                                this.router.navigate(['/train', data.networkInUsageID]);
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
