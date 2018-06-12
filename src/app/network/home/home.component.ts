import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public LINKS = [
        {
            path: '/home/schemes',
            label: 'Schemes'
        },
        {
            path: '/home/models',
            label: 'Models'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
