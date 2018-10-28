import {HiddenLayer} from './hidden-layers/hidden-layer/layers/hidden-layer.model';
import {HiddenLayersService} from './hidden-layers/hidden-layer/layers/hidden-layer.service';

export class UnlearnedNetwork {
    private _id: number;
    private _layers: HiddenLayer[] = [];
    private _name: String;

    public static fromJSON(unlearnedNetworkData: any): UnlearnedNetwork {
        const network =  new UnlearnedNetwork;
        network.id = unlearnedNetworkData.id;
        network.name = unlearnedNetworkData.name;
        network.layers = unlearnedNetworkData.scheme_json.layers.map(HiddenLayersService.getLayerFromJson);
        return network;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get layers(): HiddenLayer[]{
        return this._layers;
    }

    set layers(value: HiddenLayer[]) {
        this._layers = value;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
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
}
