import * as tf from '@tensorflow/tfjs';

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
                console.log(data);
                this._model = data;

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
