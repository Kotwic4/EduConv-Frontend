import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-output-layer',
    templateUrl: './output-layer.component.html',
    styleUrls: ['./output-layer.component.scss']
})
export class OutputLayerComponent implements OnInit {
    @Input() results;
    @Input() labels;

    constructor() {
    }

    ngOnInit() {
    }

}
