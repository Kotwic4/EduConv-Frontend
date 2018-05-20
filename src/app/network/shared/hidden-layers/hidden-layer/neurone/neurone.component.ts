import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-neurone',
    templateUrl: './neurone.component.html',
    styleUrls: ['./neurone.component.scss']
})
export class NeuroneComponent implements OnInit {
    @Input() index: number;
    @Input() placeholder: boolean;
    @Input() readonly;
    @Output() add = new EventEmitter<any>();
    @Output() delete = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }
}
