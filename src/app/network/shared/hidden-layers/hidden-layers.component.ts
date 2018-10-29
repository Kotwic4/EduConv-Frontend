import {Component, DoCheck, EventEmitter, Input, IterableDiffers, Output} from '@angular/core';
import {HiddenLayersService} from './hidden-layer/layers/hidden-layer.service';
import {HiddenLayerType} from './hidden-layer/layers/hidden-layer-type.enum';
import {HiddenLayer} from './hidden-layer/layers/hidden-layer.model';
import {HiddenLayersValidator} from './hidden-layers-validator.service';

@Component({
    selector: 'app-hidden-layers',
    templateUrl: './hidden-layers.component.html',
    styleUrls: ['./hidden-layers.component.scss'],
    providers: [HiddenLayersValidator]
})
export class HiddenLayersComponent implements DoCheck {
    @Input() layers;
    @Input() layersErrors;
    @Input() images;
    @Input() histograms;
    @Input() readonly;

    @Output() valid = new EventEmitter<boolean>();

    firstFlattenIndex: number;
    iterableDiffer;

    constructor(
        private _iterableDiffers: IterableDiffers,
        private hiddenLayersValidator: HiddenLayersValidator
    ) {
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
        this.hiddenLayersValidator.$valid.subscribe((valid: boolean) => {
            this.valid.emit(valid);
        });
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
