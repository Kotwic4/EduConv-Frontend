import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-model-confirm',
    templateUrl: './model-confirm.component.html',
    styleUrls: ['./model-confirm.component.scss']
})
export class ModelConfirmComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ModelConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public name: String
    ) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
