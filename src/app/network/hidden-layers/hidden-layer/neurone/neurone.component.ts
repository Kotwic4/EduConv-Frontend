import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-neurone',
    templateUrl: './neurone.component.html',
    styleUrls: ['./neurone.component.scss']
})
export class NeuroneComponent implements OnInit {
    @Input() placeholder: boolean;
    @Output() add = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }
}
