import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import * as NetworkActions from '../../../store/network.actions';
import * as fromApp from '../../../../store/app.reducers';
import {HiddenLayerType} from './hidden-layer-type.enum';
import {Subscription} from 'rxjs/Subscription';
import {animate, animateChild, group, query, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-hidden-layer',
    templateUrl: './hidden-layer.component.html',
    styleUrls: ['./hidden-layer.component.scss'],
    animations: [
        trigger('collapsable', [
            state('inactive', style({
                width: "0px"
            })),
            state('active', style({
                width: "*"
            })),
            transition('inactive <=> active', [
                group([
                    query('@hiddable', [
                        animateChild()
                    ]),
                    animate("200ms linear"),
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
                animate("200ms linear")
            ]),
        ]),
    ]
})
export class HiddenLayerComponent implements OnInit, OnDestroy {
    @Input() index: number;
    @Input() readonly;
    layer: any;
    subscription: Subscription;
    types_names: string[];
    types_values: number[];
    collapsed = false;
    state = "active";

    constructor(private store: Store<fromApp.AppState>) {
        this.types_names = Object.keys(HiddenLayerType).filter(k => typeof HiddenLayerType[k as any] === 'number');
        this.types_values = this.types_names.map(k => Number(HiddenLayerType[k as any]));
    }

    ngOnInit() {
        this.subscription = this.store.select('network')
            .subscribe(
                data => {
                    this.layer = {
                        ...data.networkInUsage.layers[this.index]
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    toggleCollapsed() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
        this.collapsed = !this.collapsed;
    }
}
