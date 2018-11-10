import {Component, Inject, OnInit} from '@angular/core';
import {EpochDataInfo} from '../../../shared/epoch-data-info.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

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
    public dataset: [{ data: number[] }];
    public from = 0;
    public to = 0;
    public maxValue = 0;

    constructor(
        public dialogRef: MatDialogRef<EpochDiagramComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EpochDataInfo[]
    ) {
    }

    ngOnInit() {
        this.from = 0;
        this.to = this.data.length - 1;
        this.maxValue = this.data.length - 1;
        this.labels = this.data.map(e => e.epochNumber.toString());
        this.dataset = [{data: this.data.map(e => e.acc * 100)}];
    }

    onChange() {
        const to = Math.min(this.to, this.maxValue);
        const from = Math.min(Math.max(this.from, 0), to);
        const data = this.data.slice(from, to + 1);
        this.labels = data.map(e => e.epochNumber.toString());
        this.dataset = [{data: data.map(e => e.acc * 100)}];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
