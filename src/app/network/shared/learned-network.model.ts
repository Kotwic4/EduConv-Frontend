import * as tf from '@tensorflow/tfjs';
import {HiddenLayerType} from './hidden-layers/hidden-layer/hidden-layer-type.enum';
import {element} from 'protractor';

export class LearnedNetwork {
    private _id;
    private _layers = [];
    private _labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private _input;
    private _model;

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
        const model = tf.loadModel('http://192.168.8.104:5000/model/101/model.json');

        return model.then(
            (data) => {
                this._model = data;
                console.log(model);

                this._layers = data.layers.map(
                    (element) => {
                        const name = element.name.split("_").slice(0, element.name.split("_").length-1).join("");
                        let type: HiddenLayerType;
                        let neurones: number;

                        switch(name) {
                            case "conv2d":
                                type = HiddenLayerType.Conv2D;
                                neurones = (<any>element).filters;
                                break;

                            case "maxpooling2d":
                                type = HiddenLayerType.MaxPooling2D;
                                neurones = 0;
                                break;
                            case "dropout":
                                type = HiddenLayerType.Dropout;
                                neurones = 0;
                                break;
                            case "flatten":
                                type = HiddenLayerType.Flatten;
                                neurones = 0;
                                break;
                            case "dense":
                                type = HiddenLayerType.Dense;
                                neurones = (<any>element).units;
                                break;
                        }

                        return {
                            type: type,
                            neurons: neurones
                        }
                    }
                );

                return this;
            }
        );
    }

    run() {
        const img = new Image();
        img.src = this.input;

        const croppedImage = tf.fromPixels(img);
        const batchedImage = croppedImage.toFloat().expandDims(0);

        return new Promise(
            (resolve, reject) => {
                tf.tidy(
                    () => {
                        const reshaped = batchedImage.reshape([-1, 28, 28, 1]);
                        const output = this._model.predict(reshaped);
                        const predictions = Array.from(output.dataSync());

                        // TODO
                        resolve(predictions.slice(0, 10));
                    }
                );
            }
        );
    }
}
