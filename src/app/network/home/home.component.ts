import {Component, OnInit} from '@angular/core';
import {HeaderControl} from '../header/header-control.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public controls: HeaderControl[] = [
        {
            callback: function() {
                this.router.navigate(['/scheme']);
            }.bind(this),
            tooltip: 'New scheme',
            icon: 'fa-plus-square-o'
        }
    ];

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

    constructor(private router: Router) {}

    ngOnInit() {
    }
}
