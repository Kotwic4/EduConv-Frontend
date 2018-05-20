import * as NetworkActions from './network.actions';
import {HiddenLayerType} from '../shared/hidden-layers/hidden-layer/hidden-layer-type.enum';
import {LearnNetwork} from './network.actions';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import {FETCH_UNLEARNED_NETWORK} from './network.actions';
import {Conv2DLayer} from '../shared/hidden-layers/hidden-layer/layers/Conv2DLayer';
import {HiddenLayer} from '../shared/hidden-layers/hidden-layer/hidden-layer.interface';
import * as _ from 'lodash';

const network = new UnlearnedNetwork();
network.id = 1;
network.layers = [
    new Conv2DLayer(),
    new Conv2DLayer()
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
        case (NetworkActions.NEURONE_ADD):
            networkInUsage = _.cloneDeep(<UnlearnedNetwork>state.networkInUsage);
            layer = networkInUsage.layers[action.payload];

            if (layer.haveNeurons()) {
                layer.setNeurons(layer.getNeurons() + 1);
            }

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.NEURONE_DELETE):
            networkInUsage = _.cloneDeep(<UnlearnedNetwork>state.networkInUsage);
            layer = networkInUsage.layers[action.payload];

            if (layer.haveNeurons() && layer.getNeurons() > 0) {
                layer.setNeurons(layer.getNeurons() - 1);
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
