import {Injectable} from '@angular/core';
import {HiddenLayerType} from './hidden-layer-type.enum';
import {Conv2DLayer} from './conv2d-layer/conv2d-layer.model';
import {DenseLayer} from './dense-layer/dense-layer.model';
import {DropoutLayer} from './dropout-layer/dropout-layer.model';
import {FlattenLayer} from './flatten-layer/flatten-layer.model';
import {MaxPooling2DLayer} from './max-pooling2d-layer/max-pooling2d-layer.model';
import {HiddenLayer} from './hidden-layer.model';

@Injectable()
export class HiddenLayersService {
    constructor() {

    }

    getInstance(type: HiddenLayerType) {
        if (type === HiddenLayerType.Conv2D) {
            return new Conv2DLayer();
        }
        else if (type === HiddenLayerType.Dense) {
            return new DenseLayer();
        }
        else if (type === HiddenLayerType.Dropout) {
            return new DropoutLayer();
        }
        else if (type === HiddenLayerType.Flatten) {
            return new FlattenLayer();
        }
        else if (type === HiddenLayerType.MaxPooling2D) {
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

    getTypeByName(name: string): HiddenLayerType {
        switch (name.toLowerCase()) {
            case 'conv2d':
                return HiddenLayerType.Conv2D;
            case 'maxpooling2d':
                return HiddenLayerType.MaxPooling2D;
            case 'dropout':
                return HiddenLayerType.Dropout;
            case 'flatten':
                return HiddenLayerType.Flatten;
            case 'dense':
                return HiddenLayerType.Dense;
            default:
                return null;
        }
    }
}
