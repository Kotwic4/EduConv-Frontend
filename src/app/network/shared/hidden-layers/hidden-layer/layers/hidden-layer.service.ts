import {Injectable} from '@angular/core';
import {HiddenLayerType} from './hidden-layer-type.enum';
import {Conv2DLayer} from './conv2d-layer/conv2d-layer.model';
import {DenseLayer} from './dense-layer/dense-layer.model';
import {DropoutLayer} from './dropout-layer/dropout-layer.model';
import {FlattenLayer} from './flatten-layer/flatten-layer.model';
import {MaxPooling2DLayer} from './max-pooling2d-layer/max-pooling2d-layer.model';
import {HiddenLayer} from './hidden-layer.model';
import {MaxPooling1DLayer} from './max-pooling1d-layer/max-pooling1d-layer.model';
import {AveragePooling1DLayer} from './average-pooling1d-layer/average-pooling1d-layer.model';
import {AveragePooling2DLayer} from './average-pooling2d-layer/average-pooling2d-layer.model';
import {InputLayer} from './input-layer/input-layer.model';
import {ActivationLayer} from './activation-layer/activation-layer.model';
import {BatchNormalizationLayer} from './batch-normalization-layer/batch-normalization-layer.model';

@Injectable()
export class HiddenLayersService {
    static getInstance(type: HiddenLayerType) {
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
        else if (type === HiddenLayerType.MaxPooling1D) {
            return new MaxPooling1DLayer();
        }
        else if (type === HiddenLayerType.AveragePooling1D) {
            return new AveragePooling1DLayer();
        }
        else if (type === HiddenLayerType.AveragePooling2D) {
            return new AveragePooling2DLayer();
        }
        else if (type === HiddenLayerType.Input) {
            return new InputLayer();
        }
        else if (type === HiddenLayerType.Activation) {
            return new ActivationLayer();
        }
        else if (type === HiddenLayerType.BatchNormalization) {
            return new BatchNormalizationLayer();
        }
        else {
            return null;
        }
    }

    static getType(layer: HiddenLayer): HiddenLayerType {
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
        else if (layer instanceof MaxPooling1DLayer) {
            return HiddenLayerType.MaxPooling1D;
        }
        else if (layer instanceof MaxPooling2DLayer) {
            return HiddenLayerType.MaxPooling2D;
        }
        else if (layer instanceof AveragePooling1DLayer) {
            return HiddenLayerType.AveragePooling1D;
        }
        else if (layer instanceof AveragePooling2DLayer) {
            return HiddenLayerType.AveragePooling2D;
        }
        else if (layer instanceof InputLayer) {
            return HiddenLayerType.Input;
        }
        else if (layer instanceof ActivationLayer) {
            return HiddenLayerType.Activation;
        }
        else if (layer instanceof BatchNormalizationLayer) {
            return HiddenLayerType.BatchNormalization;
        }
        else {
            return null;
        }
    }

    static getTypeByName(name: string): HiddenLayerType {
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
            case 'maxpooling1d':
                return HiddenLayerType.MaxPooling1D;
            case 'averagepooling1d':
                return HiddenLayerType.AveragePooling1D;
            case 'averagepooling2d':
                return HiddenLayerType.AveragePooling2D;
            case 'input':
                return HiddenLayerType.Input;
            case 'activation':
                return HiddenLayerType.Activation;
            case 'batchnormalization':
                return HiddenLayerType.BatchNormalization;
            default:
                return null;
        }
    }
}
