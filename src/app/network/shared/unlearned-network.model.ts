import {HiddenLayer} from './hidden-layers/hidden-layer/layers/hidden-layer.model';
import {HiddenLayersService} from './hidden-layers/hidden-layer/layers/hidden-layer.service';
import {HiddenLayerType} from './hidden-layers/hidden-layer/layers/hidden-layer-type.enum';
import {hasOwnProperty} from 'tslint/lib/utils';

export class UnlearnedNetwork {
    private _id;
    private _layers: HiddenLayer[] = [];

    constructor() {
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get layers() {
        return this._layers;
    }

    set layers(value) {
        this._layers = value;
    }

    static mapLayerNameToEnum(name): HiddenLayerType {
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
        }
        return HiddenLayerType.Dense;
    }

    static getLayerInfo(layer) {
        const type = UnlearnedNetwork.mapLayerNameToEnum(layer.layer_name);

        const service = new HiddenLayersService();
        const modalLayer = service.getInstance(type);
        modalLayer.setArgs(layer.args);

        return modalLayer;
    }

    setLayers(layers) {
        this._layers = layers.map(UnlearnedNetwork.getLayerInfo);
    }

    getRawLayers() {
        const layers = this._layers.map(
            (layer) => {
                const args = {};

                Object.keys(layer.args).forEach(
                    (i) => {
                        const arg = layer.args[i];

                        if (Array.isArray(arg)) {
                            const notEmpty = arg.some(
                                (element, index) => {
                                    return (element || element === 0);
                                }
                            );

                            if (notEmpty) {
                                args[i] = arg;
                            }
                        }
                        else {
                            if (arg || arg === 0) {
                                args[i] = arg;
                            }
                        }
                    }
                );

                return {
                    layer_name: layer.layer_name,
                    args: args
                };
            }
        );

        if (layers.length > 0) {
            layers[0].args['input_shape'] = [
                28,
                28,
                1
            ];
        }

        return layers;
    }
}
