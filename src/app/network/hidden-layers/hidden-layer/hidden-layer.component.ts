import {Component, Input, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import * as NetworkActions from '../../store/network.actions';
import * as fromApp from '../../../store/app.reducers';
import {HiddenLayerType} from './hidden-layer-type.enum';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-hidden-layer',
    templateUrl: './hidden-layer.component.html',
    styleUrls: ['./hidden-layer.component.scss']
})
export class HiddenLayerComponent implements OnInit {
    @Input() index: number;
    layer: any;
    subscription: Subscription;
    types_names: string[];
    types_values: number[];

    constructor(private store: Store<fromApp.AppState>) {
        this.types_names = Object.keys(HiddenLayerType).filter(k => typeof HiddenLayerType[k as any] === 'number');
        this.types_values = this.types_names.map(k => Number(HiddenLayerType[k as any]));
    }

    ngOnInit() {
        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.layer = {
                        ...data.hiddenLayers[this.index]
                    };
                }
            );
    }

    range(i: number) {
        return new Array(i);
    }

    onNeuroneAdd() {
        this.store.dispatch(new NetworkActions.NeuroneAdd(this.index));
    }

    onNeuroneDelete(i: number) {
        this.store.dispatch(new NetworkActions.NeuroneDelete({
            layer: this.index,
            neurone: i
        }));
    }

    onTypeChange() {
        this.store.dispatch(new NetworkActions.HiddenLayerChangeType({
            index: this.index,
            type: this.layer.type
        }));
    }

    openSettings() {
        console.log('Opening settings...');
    }
}
