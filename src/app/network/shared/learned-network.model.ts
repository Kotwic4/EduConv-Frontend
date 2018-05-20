import * as tf from '@tensorflow/tfjs';
import {HiddenLayerType} from './hidden-layers/hidden-layer/hidden-layer-type.enum';

export class LearnedNetwork {
    private _id = 101;
    private _layers = [];
    private _labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private _inputShape = [-1, 28, 28, 1];
    private _input;
    private _model: tf.Sequential;

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

    get labels() {
        return this._labels;
    }

    set labels(value) {
        this._labels = value;
    }

    get input() {
        return this._input;
    }

    set input(value) {
        this._input = value;
    }

    get inputShape(): number[] {
        return this._inputShape;
    }

    set inputShape(value: number[]) {
        this._inputShape = value;
    }

    static mapLayerNameToEnum(name): HiddenLayerType {
        const trueName = name.split('_').slice(0, name.split('_').length - 1).join('');
        switch (trueName) {
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
        const type = LearnedNetwork.mapLayerNameToEnum(layer.name);
        let neurones = 0;
        if (layer.output instanceof tf.SymbolicTensor) {
            neurones = layer.output.shape.slice(-1)[0];
        }
        return {
            type: type,
            neurons: neurones
        };
    }

    loadModel() {
        const data = tf.loadModel('http://127.0.0.1:5000/model/' + this._id + '/model.json');
        return data.then(
            (model: tf.Sequential) => {
                this._model = model;
                this._layers = model.layers.map(LearnedNetwork.getLayerInfo);
                return this;
            }
        );
    }

    runModel() {
        const img = new Image();
        img.src = this.input;
        const croppedImage = tf.fromPixels(img, 1);
        const batchedImage = croppedImage.expandDims(0).toFloat();
        const reshaped = batchedImage.reshape(this._inputShape);
        let inp: any = reshaped;
        let out: any = reshaped;
        for (let i = 0; i < this._model.layers.length; i++) {
            const layer = this._model.getLayer('', i);
            out = layer.apply(inp);
            inp = out;
        }
        return Array.from(out.dataSync());
    }

    run() {
        return new Promise(
            (resolve, reject) => {
                let result: any = null;
                tf.tidy(
                    () => {
                        result = this.runModel();
                    }
                );
                resolve(result);
            }
        );
    }
}
