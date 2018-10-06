import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {Subscription} from 'rxjs/Subscription';
import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
import {NgForm} from '@angular/forms';
import {Conv2DLayerArgs} from './conv2d-layer.model';

@Component({
    selector: 'app-conv2d-layer',
    templateUrl: './conv2d-layer.component.html',
    styleUrls: ['./conv2d-layer.component.scss']
})
export class Conv2dLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() valid = new EventEmitter<boolean>();
    activation_types_names: string[];
    activation_types_values: string[];


    constructor(
        private store: Store<fromApp.AppState>
    ) {
        this.activation_types_names =
            Object.keys(HiddenLayerActivationType).filter(k => typeof HiddenLayerActivationType[k as any] === 'string');
        this.activation_types_values = this.activation_types_names.map(k => HiddenLayerActivationType[k as any]);
    }

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    kernelX: this.layer.args.kernel_size[0],
                    kernelY: this.layer.args.kernel_size[1],
                    strideX: this.layer.args.strides[0],
                    strideY: this.layer.args.strides[1],
                    activation: this.layer.args.activation,
                });

                this.valid.emit(this.confForm.valid);
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: Conv2DLayerArgs = {
            filters: this.layer.args.filters,
            kernel_size: [form.value.kernelX, form.value.kernelY],
            strides: [form.value.strideX, form.value.strideY],
            activation: form.value.activation
        };

        this.onSave.emit(args);
    }
}
