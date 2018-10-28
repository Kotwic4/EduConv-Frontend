import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-input-layer',
    templateUrl: './input-layer.component.html',
    styleUrls: ['./input-layer.component.scss']
})
export class InputLayerComponent implements OnInit {
    @Input() image;

    constructor(
    ) {
    }

    ngOnInit() {}
}
