import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';
import {BatchNormalizationLayerArgs} from './batch-normalization-layer.model';

@Component({
    selector: 'app-batch-normalization-layer',
    templateUrl: './batch-normalization-layer.component.html',
    styleUrls: ['./batch-normalization-layer.component.scss']
})
export class BatchNormalizationLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({
                    axis: this.layer.args.axis,
                    momentum: this.layer.args.momentum,
                    epsilon: this.layer.args.epsilon,
                });
            }
        );
    }

    onSubmit(form: NgForm) {
        const args: BatchNormalizationLayerArgs = {
            axis: form.value.axis,
            momentum: form.value.momentum,
            epsilon: form.value.epsilon,
        };

        this.onSave.emit(args);
    }
}
