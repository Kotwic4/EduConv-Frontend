import {
    Component,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import {Store} from '@ngrx/store';

import * as NetworkActions from '../../../store/network.actions';
import * as fromApp from '../../../../store/app.reducers';
import {HiddenLayerType} from './layers/hidden-layer-type.enum';
import {HiddenLayerChangeArgs, HiddenLayerRemove} from '../../../store/network.actions';
import {HiddenLayer} from './layers/hidden-layer.model';
import {HiddenLayersService} from './layers/hidden-layer.service';
import {MatDialog} from '@angular/material';
import {DeletionConfirmComponent} from './layers/deletion-confirm/deletion-confirm.component';
import {HiddenLayersValidator} from '../hidden-layers-validator.service';

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
    @ViewChild('MaxPooling1D') MaxPooling1D;
    @ViewChild('BatchNormalization') BatchNormalization;
    @ViewChild('AveragePooling2D') AveragePooling2D;
    @ViewChild('AveragePooling1D') AveragePooling1D;
    @ViewChild('Activation') Activation;

    @Input() index: number;
    @Input() layer: HiddenLayer;
    @Input() images: string[];
    @Input() readonly;
    @Input() beforeFlatten: boolean;

    layerType: HiddenLayerType;
    types_names: string[];
    types_values: number[];
    collapsed: boolean;
    initArgsValid: boolean = null;
    argsValid: boolean;

    constructor(
        private store: Store<fromApp.AppState>,
        public dialog: MatDialog,
        private hiddenLayersValidator: HiddenLayersValidator
    ) {
        this.types_names = Object.keys(HiddenLayerType).filter(k => typeof HiddenLayerType[k as any] === 'number');
        this.types_values = this.types_names.map(k => Number(HiddenLayerType[k as any]));
    }

    ngOnInit() {
        this.layerType = HiddenLayersService.getType(this.layer);
        this.collapsed = this.readonly || !this.layer.haveNeurons();

        if (!this.readonly) {
            setTimeout(() => {
                this.popover.open();
            });
        }
    }

    range(i: number) {
        return new Array(i);
    }

    onTypeChange() {
        this.store.dispatch(new NetworkActions.HiddenLayerChangeType({
            index: this.index,
            layer: HiddenLayersService.getInstance(this.layerType)
        }));

        this.initArgsValid = null;
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }

    onSave(args) {
        this.store.dispatch(new HiddenLayerChangeArgs({
            index: this.index,
            args: args
        }));
        this.updateValid(true);
        this.initArgsValid = true;
        this.popover.close();
    }

    onCancel() {
        this.updateValid(this.initArgsValid);
        this.popover.close();
    }

    onDelete() {
        const dialogRef = this.dialog.open(DeletionConfirmComponent, {
            hasBackdrop: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.hiddenLayersValidator.removeLayer(this.index);
                this.popover.close();
                this.store.dispatch(new HiddenLayerRemove(this.index));
            }
        });
    }

    onValid(valid: boolean) {
        this.argsValid = valid;

        if (this.initArgsValid === null) {
            this.initArgsValid = valid;
            this.hiddenLayersValidator.addLayer(valid);
        }

        this.updateValid();
    }

    getArgsComponent(name: string) {
        return this[name];
    }

    onAmountChange(value: number) {
        this.store.dispatch(new NetworkActions.NeuroneChange({
            index: this.index,
            amount: value || 0
        }));

        this.updateValid();
    }

    getNeuronsName() {
        return this.beforeFlatten ? 'volumens' : 'neurons';
    }

    updateValid(argsValid = this.argsValid) {
        if (this.argsValid !== argsValid) {
            this.argsValid = argsValid;
        }

        if (!this.readonly) {
            if (this.layer.haveNeurons()) {
                this.hiddenLayersValidator.updateValid(this.index, this.layer.getNeurons() > 0 && argsValid);
            }
            else {
                this.hiddenLayersValidator.updateValid(this.index, argsValid);
            }
        }
    }
}
