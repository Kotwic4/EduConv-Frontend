import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {ActivationLayerArgs} from './activation-layer.model';
import {HiddenLayerActivationType} from '../hidden-layer-activation.enum';

@Component({
    selector: 'app-activation-layer',
    templateUrl: './activation-layer.component.html',
    styleUrls: ['./activation-layer.component.scss']
})
export class ActivationLayerComponent implements OnInit {
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
                    activation: this.layer.args.activation,
                });

                this.valid.emit(this.confForm.valid);
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: ActivationLayerArgs = {
            activation: form.value.activation
        };

        this.onSave.emit(args);
    }
}
