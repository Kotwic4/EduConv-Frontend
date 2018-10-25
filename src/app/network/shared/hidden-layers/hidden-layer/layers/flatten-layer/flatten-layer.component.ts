import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../../../store/app.reducers';

@Component({
    selector: 'app-flatten-layer',
    templateUrl: './flatten-layer.component.html',
    styleUrls: ['./flatten-layer.component.scss']
})
export class FlattenLayerComponent implements OnInit {
    @ViewChild('f') confForm: NgForm;
    @Input() index: number;
    @Input() layer: any;
    @Input() readonly;
    @Output() onSave = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();
    @Output() valid = new EventEmitter<boolean>();

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        setTimeout(
            () => {
                this.confForm.setValue({});

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
        const args = {};

        this.onSave.emit(args);
    }
}
