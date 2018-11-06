import {Component, OnInit} from '@angular/core';
import {HeaderControl} from '../header/header-control.interface';
import {Router} from '@angular/router';
import {INFO_DICTIONARY} from '../shared/info-dictionary';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    dictionary = INFO_DICTIONARY;
    public controls: HeaderControl[] = [
        {
            callback: function() {
                this.router.navigate(['/model']);
            }.bind(this),
            tooltip: 'New model',
            icon: 'fa-plus-square-o'
        }
    ];

    public LINKS = [
        {
            path: '/home/models',
            label: 'Models',
            tooltip: INFO_DICTIONARY['models']
        },
        {
            path: '/home/trained_models',
            label: 'Trained models',
            tooltip: INFO_DICTIONARY['trained_models']
        },
        {
            path: '/home/datasets',
            label: 'Datasets',
            tooltip: INFO_DICTIONARY['datasets']
        }
    ];

    constructor(private router: Router) {}

    ngOnInit() {
    }
}
