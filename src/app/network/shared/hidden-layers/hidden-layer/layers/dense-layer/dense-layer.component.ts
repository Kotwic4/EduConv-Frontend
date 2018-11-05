import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';
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
    @Output() valid = new EventEmitter<boolean>();
    activation_types_names: string[];
    activation_types_values: string[];


    constructor(private store: Store<fromApp.AppState>) {
        this.activation_types_names =
            Object.keys(HiddenLayerActivationType).filter(k => typeof HiddenLayerActivationType[k as any] === 'string');
        this.activation_types_values = this.activation_types_names.map(k => HiddenLayerActivationType[k as any]);
    }

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    units: this.layer.args.units,
                    activation: this.layer.args.activation,
                });

                if (this.readonly) {
                    this.valid.emit(true);
                }
                else {
                    this.valid.emit(this.confForm.valid);
                }
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: DenseLayerArgs = {
            units: form.value.units,
            activation: form.value.activation
        };

        this.onSave.emit(args);
    }
}
