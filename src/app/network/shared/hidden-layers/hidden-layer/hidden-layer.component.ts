import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';

import * as NetworkActions from '../../../store/network.actions';
import * as fromApp from '../../../../store/app.reducers';
import {HiddenLayerType} from './layers/hidden-layer-type.enum';
import {animate, animateChild, group, query, state, style, transition, trigger} from '@angular/animations';
import {HiddenLayerChangeArgs} from '../../../store/network.actions';
import {HiddenLayer} from './layers/hidden-layer.model';
import {HiddenLayersService} from './layers/hidden-layer.service';

@Component({
    selector: 'app-hidden-layer',
    templateUrl: './hidden-layer.component.html',
    styleUrls: ['./hidden-layer.component.scss'],
    animations: [
        trigger('collapsable', [
            state('inactive', style({
                width: '0px'
            })),
            state('active', style({
                width: '*'
            })),
            transition('inactive <=> active', [
                group([
                    query('@hiddable', [
                        animateChild()
                    ]),
                    animate('200ms linear'),
                ]),
            ]),
        ]),
        trigger('hiddable', [
            state('inactive', style({
                opacity: 0
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive <=> active', [
                animate('200ms linear')
            ]),
        ]),
    ]
})
export class HiddenLayerComponent implements OnInit {
    @ViewChild('p') popover;
    @ViewChild("Conv2D") Conv2D;
    @ViewChild("Dense") Dense;
    @ViewChild("Dropout") Dropout;
    @ViewChild("Flatten") Flatten;
    @ViewChild("MaxPooling2D") MaxPooling2D;

    @Input() index: number;
    @Input() layer: HiddenLayer;
    @Input() readonly;
    layerType: HiddenLayerType;
    types_names: string[];
    types_values: number[];
    state = 'active';

    constructor(private store: Store<fromApp.AppState>,
                private hiddenLayersService: HiddenLayersService) {
        this.types_names = Object.keys(HiddenLayerType).filter(k => typeof HiddenLayerType[k as any] === 'number');
        this.types_values = this.types_names.map(k => Number(HiddenLayerType[k as any]));
    }

    ngOnInit() {
        this.layerType = this.hiddenLayersService.getType(this.layer);
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
        this.state = this.state === 'active' ? 'inactive' : 'active';
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
