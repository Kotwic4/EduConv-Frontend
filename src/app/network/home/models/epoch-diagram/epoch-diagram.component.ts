import {Component, Inject, OnInit} from '@angular/core';
import {EpochDataInfo} from '../../../shared/epoch-data-info.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {number} from 'ng2-validation/dist/number';

@Component({
    selector: 'app-epoch-diagram',
    templateUrl: './epoch-diagram.component.html',
    styleUrls: ['./epoch-diagram.component.scss']
})
export class EpochDiagramComponent implements OnInit {
    public diagramOptions: any = {
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Epoch learned'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Accuracy'
                },
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    stepSize: 5,
                }
            }]
        },
        lineTension: 0,
    };

    public labels: String[];
    public dataset: [{data: number[]}];

    constructor(
        public dialogRef: MatDialogRef<EpochDiagramComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EpochDataInfo[]
    ) {
    }

    ngOnInit() {
        this.labels = this.data.map(e => e.epochNumber.toString());
        this.dataset = [{ data: this.data.map(e => e.acc * 100)}];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
