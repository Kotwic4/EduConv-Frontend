import * as tf from '@tensorflow/tfjs';
import {HiddenLayersService} from './hidden-layers/hidden-layer/layers/hidden-layer.service';
import {API_URL} from '../network.consts';
import {HiddenLayer} from './hidden-layers/hidden-layer/layers/hidden-layer.model';
import {NetworkOutput} from './network-output.model';
import {NetworkDataParser} from './network-data-parser.model';
import {LearnedNetworkInfo} from './learned-network-info.model';
import {DatasetInfo} from './dataset-info.model';

export class LearnedNetwork {
    private _id;
    private _layers: HiddenLayer[] = [];
    private _labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private _inputShape = [-1, 28, 28, 1];
    private _input;
    private _model: tf.Sequential;
    private _name: String;
    private _dataset: DatasetInfo;

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

    get dataset(): DatasetInfo {
        return this._dataset;
    }

    set dataset(value: DatasetInfo) {
        this._dataset = value;
    }

    setModelInfo(model: LearnedNetworkInfo) {
        this._id = model.id;
        this._inputShape = [-1, model.dataset.imgWidth, model.dataset.imgHeight, model.dataset.imgDepth];
        this._labels = model.dataset.labels;
        this._name = model.name;
        this._dataset = model.dataset;
    }

    loadModel() {
        const data = tf.loadModel(API_URL + 'trained_model/' + this._id + '/file/model.json');

        return data.then(
            (model: tf.Sequential) => {
                this._model = model;
                this._layers = model.layers.map(this._getLayerInfo.bind(this));

                return this;
            }
        );
    }

    runModel(): NetworkOutput {
        const inputImg = new Image();
        inputImg.src = this.input;
        const croppedInputImage = tf.fromPixels(inputImg, this._inputShape[3]);
        const batchedInputImage = croppedInputImage.expandDims(0).toFloat();
        const reshapedInputImage: any = batchedInputImage.reshape(this._inputShape);

        const activationImages = [];
        const activationHistograms = [];
        let inputData: any = reshapedInputImage.div(255);
        let outputData: any = reshapedInputImage;

        for (let i = 0; i < this._model.layers.length; i++) {
            const layer = this._model.getLayer('', i);
            outputData = layer.apply(inputData);
            activationImages.push(NetworkDataParser.generateActivationImage(outputData));
            activationHistograms.push(NetworkDataParser.generateActivationHistogram(outputData));
            inputData = outputData;
        }

        return new NetworkOutput(
            activationImages,
            activationHistograms,
            Array.from(outputData.dataSync())
        );
    }

    run(): Promise<NetworkOutput> {
        return new Promise(
            (resolve, reject) => {
                tf.tidy(
                    () => {
                        resolve(this.runModel());
                    }
                );
            }
        );
    }

    private _getLayerInfo(layer) {
        const trueName = layer.name.split('_').slice(0, layer.name.split('_').length - 1).join('');
        const type = HiddenLayersService.getTypeByName(trueName);

        if (type === null) {
            throw new Error('Unrecognized layer type.');
        }

        let neurones = 0;
        if (layer.output instanceof tf.SymbolicTensor) {
            neurones = layer.output.shape.slice(-1)[0];
        }

        const layerInfo = HiddenLayersService.getInstance(type);
        layerInfo.getArgsFromLayer(layer);
        layerInfo.setNeurons(neurones);

        return layerInfo;
    }
}
