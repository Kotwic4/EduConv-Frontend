import {Injectable} from '@angular/core';
import {HiddenLayerType} from './hidden-layer/hidden-layer-type.enum';
import {Conv2DLayer} from './hidden-layer/layers/Conv2DLayer';
import {DenseLayer} from './hidden-layer/layers/DenseLayer';
import {DropoutLayer} from './hidden-layer/layers/DropoutLayer';
import {FlattenLayer} from './hidden-layer/layers/FlattenLayer';
import {MaxPooling2DLayer} from './hidden-layer/layers/MaxPooling2DLayer';
import {HiddenLayer} from './hidden-layer/hidden-layer.interface';

@Injectable()
export class HiddenLayersService {
    constructor() {

    }

    getInstance(type: HiddenLayerType) {
        if (type == HiddenLayerType.Conv2D) {
            return new Conv2DLayer();
        }
        else if (type == HiddenLayerType.Dense) {
            return new DenseLayer();
        }
        else if (type == HiddenLayerType.Dropout) {
            return new DropoutLayer();
        }
        else if (type == HiddenLayerType.Flatten) {
            return new FlattenLayer();
        }
        else if (type == HiddenLayerType.MaxPooling2D) {
            return new MaxPooling2DLayer();
        }
        else {
            return null;
        }
    }

    getType(layer: HiddenLayer): HiddenLayerType {
        if (layer instanceof Conv2DLayer) {
            return HiddenLayerType.Conv2D;
        }
        else if (layer instanceof DenseLayer) {
            return HiddenLayerType.Dense;
        }
        else if (layer instanceof DropoutLayer) {
            return HiddenLayerType.Dropout;
        }
        else if (layer instanceof FlattenLayer) {
            return HiddenLayerType.Flatten;
        }
        else if (layer instanceof MaxPooling2DLayer) {
            return HiddenLayerType.MaxPooling2D;
        }
        else {
            return null;
        }
    }
}
