import {HiddenLayer} from './hidden-layers/hidden-layer/hidden-layer.interface';

export class UnlearnedNetwork {
    private _id;
    private _layers: HiddenLayer[];

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
}
