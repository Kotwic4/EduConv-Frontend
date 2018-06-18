import {Component, DoCheck, Input, IterableDiffers, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {HiddenLayersService} from './hidden-layer/layers/hidden-layer.service';
import {HiddenLayerType} from './hidden-layer/layers/hidden-layer-type.enum';

@Component({
    selector: 'app-hidden-layers',
    templateUrl: './hidden-layers.component.html',
    styleUrls: ['./hidden-layers.component.scss']
})
export class HiddenLayersComponent implements DoCheck {
    @Input() layers;
    @Input() images;
    @Input() readonly;

    firstFlattenIndex: number;
    iterableDiffer;

    constructor(private _iterableDiffers: IterableDiffers) {
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    }

    ngDoCheck() {
        const changes = this.iterableDiffer.diff(this.layers);
        if (changes) {
            this.firstFlattenIndex = this.layers.findIndex(
                (element) => {
                    return HiddenLayersService.getType(element) === HiddenLayerType.Flatten;
                }
            );
        }
    }
}
