import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hidden-layer',
    templateUrl: './hidden-layer.component.html',
    styleUrls: ['./hidden-layer.component.scss']
})
export class HiddenLayerComponent implements OnInit {
    @Input() layer;

    constructor() {
    }

    ngOnInit() {
    }

    range(i: number) {
        return new Array(i);
    }
}
