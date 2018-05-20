import * as NetworkActions from './network.actions';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import * as _ from 'lodash';
import {Conv2DLayer} from '../shared/hidden-layers/hidden-layer/layers/conv2d-layer/conv2d-layer.model';
import {HiddenLayer} from '../shared/hidden-layers/hidden-layer/layers/hidden-layer.model';
import {DenseLayer} from '../shared/hidden-layers/hidden-layer/layers/dense-layer/dense-layer.model';
import {DropoutLayer} from '../shared/hidden-layers/hidden-layer/layers/dropout-layer/dropout-layer.model';
import {FlattenLayer} from '../shared/hidden-layers/hidden-layer/layers/flatten-layer/flatten-layer.model';
import {MaxPooling2DLayer} from '../shared/hidden-layers/hidden-layer/layers/max-pooling2d-layer/max-pooling2d-layer.model';

const network = new UnlearnedNetwork();
network.id = 1;
network.layers = [
    new Conv2DLayer(),
    new Conv2DLayer(),
    new DenseLayer(),
    new DropoutLayer(),
    new FlattenLayer(),
    new MaxPooling2DLayer()
];

export interface State {
    uploadedNetwork: String;
    fetchingNetwork: boolean;
    savingNetwork: boolean;
    learningNetwork: boolean;
    runningNetwork: boolean;
    networkInUsage: UnlearnedNetwork | LearnedNetwork;
    networkRunResult: NetworkOutput;
}

const initialState: State = {
    uploadedNetwork: '',
    fetchingNetwork: false,
    savingNetwork: false,
    learningNetwork: false,
    runningNetwork: false,
    networkInUsage: network,
    networkRunResult: null
};

export function networkReducer(state = initialState, action: NetworkActions.NetworkActions) {
    let networkInUsage;
    let layer: HiddenLayer;

    switch (action.type) {
        case (NetworkActions.INPUT_IMAGE_UPLOAD):
            networkInUsage = _.cloneDeep(<LearnedNetwork>state.networkInUsage);
            networkInUsage.input = _.cloneDeep(action.payload);

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.INPUT_IMAGE_DELETE):
            networkInUsage = _.cloneDeep(<LearnedNetwork>state.networkInUsage);
            networkInUsage.input = null;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        // case (NetworkActions.NETWORK_UPLOAD):
        //     return {
        //         ...state,
        //         uploadedNetwork: action.payload
        //     };
        case (NetworkActions.NEURONE_CHANGE):
            networkInUsage = _.cloneDeep(<UnlearnedNetwork>state.networkInUsage);
            layer = networkInUsage.layers[action.payload.index];

            if (layer.haveNeurons()) {
                layer.setNeurons(action.payload.amount);
            }

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_ADD):
            networkInUsage = _.cloneDeep(<UnlearnedNetwork>state.networkInUsage);
            networkInUsage.layers.push(action.payload);

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_CHANGE_TYPE):
            networkInUsage = _.cloneDeep(<UnlearnedNetwork>state.networkInUsage);
            networkInUsage.layers[action.payload.index] = action.payload.layer;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_CHANGE_ARGS):
            networkInUsage = _.cloneDeep(<UnlearnedNetwork>state.networkInUsage);
            layer = networkInUsage.layers[action.payload.index];
            layer.setArgs({
                ...action.payload.args
            });

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.START_MODELING_NETWORK):
            return {
                ...state
            };
        case (NetworkActions.MODEL_NETWORK):
            return {
                ...state,
                savingNetwork: true
            };
        case (NetworkActions.END_MODELING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload,
                savingNetwork: false
            };
        case (NetworkActions.FETCH_UNLEARNED_NETWORK):
            return {
                ...state,
                fetchingNetwork: true
            };
        case (NetworkActions.START_LEARNING_NETWORK):
            return {
                ...state,
                fetchingNetwork: false
            };
        case (NetworkActions.END_LEARNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload
            };
        case (NetworkActions.FETCH_LEARNED_NETWORK):
            return {
                ...state,
                fetchingNetwork: true
            };
        case (NetworkActions.START_RUNNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload,
                fetchingNetwork: false
            };
        case (NetworkActions.RUN_NETWORK):
            return {
                ...state,
                runningNetwork: true
            };
        case (NetworkActions.END_RUNNING_NETWORK):
            return {
                ...state,
                networkRunResult: action.payload,
                runningNetwork: false
            };
        default:
            return state;
    }
}
