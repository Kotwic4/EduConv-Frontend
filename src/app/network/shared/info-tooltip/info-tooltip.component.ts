import {Component, Input, OnInit} from '@angular/core';
import {INFO_DICTIONARY} from '../info-dictionary';

@Component({
    selector: 'app-info-tooltip',
    templateUrl: './info-tooltip.component.html',
    styleUrls: ['./info-tooltip.component.scss']
})
export class InfoTooltipComponent implements OnInit {
    @Input() key: string;
    @Input() multiline = false;

    public dictionary = INFO_DICTIONARY;

    constructor() {}

    ngOnInit() {
    }
}
