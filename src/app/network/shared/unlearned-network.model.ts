import {HiddenLayer} from './hidden-layers/hidden-layer/layers/hidden-layer.model';
import {HiddenLayersService} from './hidden-layers/hidden-layer/layers/hidden-layer.service';

export class UnlearnedNetwork {
    private _id;
    private _layers: HiddenLayer[] = [];
    private hiddenLayersService: HiddenLayersService;

    constructor() {
        this.hiddenLayersService = new HiddenLayersService();
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

    setRawLayers(layers) {
        this._layers = layers.map(this._getLayerInfo.bind(this));
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

        return layers;
    }

    private _getLayerInfo(layer) {
        const type = this.hiddenLayersService.getTypeByName(layer.layer_name);

        if (type === null) {
            throw new Error("Unrecognized layer type.");
        }

        const layerInfo = this.hiddenLayersService.getInstance(type);
        layerInfo.setArgs(layer.args);

        return layerInfo;
    }
}
