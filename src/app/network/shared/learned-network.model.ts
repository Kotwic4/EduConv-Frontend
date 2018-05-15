import * as tf from '@tensorflow/tfjs';
import {HiddenLayerType} from './hidden-layers/hidden-layer/hidden-layer-type.enum';

export class LearnedNetwork {
    private _id;
    private _layers = [];
    private _labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private _input;
    private _model: tf.Sequential;

    // TODO
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

    loadModel() {
        const model = tf.loadModel('http://127.0.0.1:5000/model/101/model.json');

        return model.then(
            (data: tf.Sequential) => {
                this._model = data;

                this._layers = data.layers.map(
                    (layer) => {
                        const name = layer.name.split('_').slice(0, layer.name.split('_').length - 1).join('');
                        let type: HiddenLayerType;
                        let neurones = 0;
                        if (layer.output instanceof tf.SymbolicTensor) {
                            neurones = layer.output.shape.slice(-1)[0];
                        }
                        switch (name) {
                            case 'conv2d':
                                type = HiddenLayerType.Conv2D;
                                break;

                            case 'maxpooling2d':
                                type = HiddenLayerType.MaxPooling2D;
                                break;
                            case 'dropout':
                                type = HiddenLayerType.Dropout;
                                break;
                            case 'flatten':
                                type = HiddenLayerType.Flatten;
                                break;
                            case 'dense':
                                type = HiddenLayerType.Dense;
                                break;
                        }

                        return {
                            type: type,
                            neurons: neurones
                        };
                    }
                );

                return this;
            }
        );
    }

    run() {
        const img = new Image();
        img.src = this.input;

        const croppedImage = tf.fromPixels(img, 1);
        const batchedImage = croppedImage.expandDims(0).toFloat();

        return new Promise(
            (resolve, reject) => {
                tf.tidy(
                    () => {
                        const reshaped = batchedImage.reshape([-1, 28, 28, 1]);
                        const model: tf.Sequential = this._model;
                        let inp: any = reshaped;
                        let out: any = reshaped;
                        for (let i = 0; i < model.layers.length; i++) {
                            const layer = model.getLayer('', i);
                            out = layer.apply(inp);
                            console.log(out);
                            inp = out;
                        }
                        resolve(Array.from(out.dataSync()));
                    }
                );
            }
        );
    }
}
