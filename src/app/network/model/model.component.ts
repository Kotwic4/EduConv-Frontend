import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import * as NetworkActions from '../store/network.actions';
import {Conv2DLayer} from '../shared/hidden-layers/hidden-layer/layers/conv2d-layer/conv2d-layer.model';
import {ToasterService} from 'angular2-toaster';

@Component({
    selector: 'app-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public processing: boolean;
    public saving = false;

    public saveModel = function() {
        this.saving = true;
        this.store.dispatch(new NetworkActions.ModelNetwork());
    }.bind(this);

    public addLayer = function() {
        this.store.dispatch(new NetworkActions.HiddenLayerAdd(new Conv2DLayer()));
    }.bind(this);

    constructor(
        private store: Store<fromApp.AppState>,
        private route: ActivatedRoute,
        private router: Router,
        private toasterService: ToasterService
    ) {}

    ngOnInit() {
        this.store.dispatch(new NetworkActions.StartModelingNetwork());

        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.processing = data.processing;

                    if (!this.processing && this.saving) {
                        this.toasterService.pop('success', '', 'Model successfully saved');

                        this.router.navigate(['/learn', data.networkInUsageID]);
                    }
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
