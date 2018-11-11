import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-output-layer',
    templateUrl: './output-layer.component.html',
    styleUrls: ['./output-layer.component.scss']
})
export class OutputLayerComponent implements OnInit, OnChanges {
    @Input() results;
    @Input() labels;

    public sortedResults;
    public sortedLabels;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.results) {
            const sorted = this.results
                .map((value, index) => [value, this.labels[index]])
                .sort((a, b) => b[0] - a[0]);
            this.sortedResults = sorted.map(value => value[0]);
            this.sortedLabels = sorted.map(value => value[1]);
        } else {
            this.sortedLabels = this.labels;
            this.sortedResults = this.results;
        }

    }

}
