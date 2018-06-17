import {Component, Input, OnInit} from '@angular/core';

import {HeaderControl} from './header-control.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() controls: HeaderControl[];

    ngOnInit() {
    }
}
