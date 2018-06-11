import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';

import * as NetworkActions from '../../../store/network.actions';
import * as fromApp from '../../../../store/app.reducers';
import {HiddenLayerType} from './layers/hidden-layer-type.enum';
import {HiddenLayerChangeArgs, HiddenLayerRemove} from '../../../store/network.actions';
import {HiddenLayer} from './layers/hidden-layer.model';
import {HiddenLayersService} from './layers/hidden-layer.service';

@Component({
    selector: 'app-hidden-layer',
    templateUrl: './hidden-layer.component.html',
    styleUrls: ['./hidden-layer.component.scss']
})
export class HiddenLayerComponent implements OnInit {
    @ViewChild('p') popover;
    @ViewChild('Conv2D') Conv2D;
    @ViewChild('Dense') Dense;
    @ViewChild('Dropout') Dropout;
    @ViewChild('Flatten') Flatten;
    @ViewChild('MaxPooling2D') MaxPooling2D;

    @Input() index: number;
    @Input() layer: HiddenLayer;
    @Input() images: string[];
    @Input() readonly;
    layerType: HiddenLayerType;
    types_names: string[];
    types_values: number[];
    collapsed: boolean;

    constructor(private store: Store<fromApp.AppState>,
                private hiddenLayersService: HiddenLayersService) {
        this.types_names = Object.keys(HiddenLayerType).filter(k => typeof HiddenLayerType[k as any] === 'number');
        this.types_values = this.types_names.map(k => Number(HiddenLayerType[k as any]));
    }

    ngOnInit() {
        this.layerType = this.hiddenLayersService.getType(this.layer);
        this.collapsed = this.readonly;
    }

    range(i: number) {
        return new Array(i);
    }

    onTypeChange() {
        this.store.dispatch(new NetworkActions.HiddenLayerChangeType({
            index: this.index,
            layer: this.hiddenLayersService.getInstance(this.layerType)
        }));
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }

    onSave(args) {
        this.store.dispatch(new HiddenLayerChangeArgs({
            index: this.index,
            args: args
        }));
        this.popover.close();
    }

    onCancel() {
        this.popover.close();
    }

    onDelete() {
        this.popover.close();
        this.store.dispatch(new HiddenLayerRemove(this.index));
    }

    getArgsComponent(name: string) {
        return this[name];
    }

    onAmountChange(value: number) {
        this.store.dispatch(new NetworkActions.NeuroneChange({
            index: this.index,
            amount: value || 0
        }));
    }
}
