import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
import {Conv2DLayerArgs} from '../conv2d-layer/conv2d-layer.model';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {DenseLayerArgs} from './dense-layer.model';

@Component({
    selector: 'app-dense-layer',
    templateUrl: './dense-layer.component.html',
    styleUrls: ['./dense-layer.component.scss']
})
export class DenseLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    activation_types_names: string[];
    activation_types_values: string[];


    constructor(private store: Store<fromApp.AppState>) {
        this.activation_types_names = Object.keys(HiddenLayerActivationType).filter(k => typeof HiddenLayerActivationType[k as any] === 'string');
        this.activation_types_values = this.activation_types_names.map(k => HiddenLayerActivationType[k as any]);
    }

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    activation: this.layer.args.activation,
                    useBias: this.layer.args.use_bias
                });
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: DenseLayerArgs = {
            units: this.layer.args.units,
            use_bias: form.value.useBias,
            activation: form.value.activation
        };

        this.onSave.emit(args);
    }
}
