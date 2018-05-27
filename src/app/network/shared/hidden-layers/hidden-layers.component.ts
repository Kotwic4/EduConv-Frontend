import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-hidden-layers',
    templateUrl: './hidden-layers.component.html',
    styleUrls: ['./hidden-layers.component.scss']
})
export class HiddenLayersComponent {
    @Input() layers;
    @Input() images;
    @Input() readonly;
}
