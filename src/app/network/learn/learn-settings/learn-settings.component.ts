import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as fromApp from '../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {LearnSettings} from './learn-settings.model';
import {NgForm} from '@angular/forms';
import {SetLearnSettings} from '../../store/network.actions';
import {DatasetInfo} from '../../shared/dataset-info.model';

@Component({
    selector: 'app-learn-settings',
    templateUrl: './learn-settings.component.html',
    styleUrls: ['./learn-settings.component.scss']
})
export class LearnSettingsComponent implements OnInit {
    @ViewChild('f') settingsForm: NgForm;
    @Input() datasets: DatasetInfo[];
    @Input() settings: LearnSettings;
    @Output() status = new EventEmitter<any>();

    constructor(
        private store: Store<fromApp.AppState>
        ) {
    }

    ngOnInit() {
        setTimeout(
            () => {
                this.settingsForm.setValue({
                    dataset: this.settings.dataset,
                    epochs: this.settings.epochs,
                    batchSize: this.settings.batchSize,
                });

                this.settingsForm.valueChanges.subscribe(
                    (values) => {
                        this.store.dispatch(new SetLearnSettings(
                            new LearnSettings(
                                values.dataset,
                                values.epochs,
                                values.batchSize,
                            )
                        ));
                    }
                );

                this.settingsForm.statusChanges.subscribe(
                    (status) => {
                        this.status.emit(status);
                    }
                );
                this.settingsForm.control.updateValueAndValidity();
            }
        );
    }
}
