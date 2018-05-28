import * as NetworkActions from './network.actions';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import * as _ from 'lodash';
import {HiddenLayer} from '../shared/hidden-layers/hidden-layer/layers/hidden-layer.model';

export interface State {
    uploadedNetwork: String;
    networkInUsage: UnlearnedNetwork | LearnedNetwork;
    networkInUsageID: number;
    networkRunResult: NetworkOutput;
    processing: boolean;
    processingError: any;
}

const initialState: State = {
    uploadedNetwork: null,
    networkInUsage: null,
    networkInUsageID: null,
    networkRunResult: null,
    processing: false,
    processingError: null
};


export function networkReducer(state = initialState, action: NetworkActions.NetworkActions) {
    let networkInUsage;
    let layer: HiddenLayer;

    switch (action.type) {
        // case (NetworkActions.NETWORK_UPLOAD):
        //     return {
        //         ...state,
        //         uploadedNetwork: action.payload
        //     };
        case (NetworkActions.NEURONE_CHANGE):
            networkInUsage = <UnlearnedNetwork>state.networkInUsage;
            layer = networkInUsage.layers[action.payload.index];

            if (layer.haveNeurons()) {
                layer.setNeurons(action.payload.amount);
            }

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_ADD):
            networkInUsage = <UnlearnedNetwork>state.networkInUsage;
            networkInUsage.layers.push(action.payload);

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_REMOVE):
            networkInUsage = <UnlearnedNetwork>state.networkInUsage;
            networkInUsage.layers.splice(action.payload, 1);

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_CHANGE_TYPE):
            networkInUsage = <UnlearnedNetwork>state.networkInUsage;
            networkInUsage.layers[action.payload.index] = action.payload.layer;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.HIDDEN_LAYER_CHANGE_ARGS):
            networkInUsage = <UnlearnedNetwork>state.networkInUsage;
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
                ...state,
                networkInUsage: new UnlearnedNetwork()
            };
        case (NetworkActions.MODEL_NETWORK):
            return {
                ...state,
                processing: true,
                processingError: null
            };
        case (NetworkActions.END_MODELING_NETWORK):
            return {
                ...state,
                networkInUsageID: action.payload,
                processing: false
            };
        case (NetworkActions.FETCH_UNLEARNED_NETWORK):
            return {
                ...state,
                processing: true,
                processingError: null
            };
        case (NetworkActions.START_LEARNING_NETWORK):
            const unlearnedNetwork = new UnlearnedNetwork();
            unlearnedNetwork.setRawLayers(action.payload.layers);

            return {
                ...state,
                networkInUsage: unlearnedNetwork,
                processing: false
            };
        case (NetworkActions.LEARN_NETWORK):
            return {
                ...state,
                processing: true,
                processingError: null
            };
        case (NetworkActions.END_LEARNING_NETWORK):
            return {
                ...state,
                networkInUsage: null,
                processing: false
            };
        case (NetworkActions.FETCH_LEARNED_NETWORK):
            return {
                ...state,
                processing: true,
                processingError: null,
                networkRunResult: null
            };
        case (NetworkActions.START_RUNNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload,
                processing: false
            };
        case (NetworkActions.RUN_NETWORK):
            return {
                ...state,
                processing: true,
                processingError: null
            };
        case (NetworkActions.END_RUNNING_NETWORK):
            return {
                ...state,
                networkRunResult: action.payload,
                processing: false
            };
        case (NetworkActions.INPUT_IMAGE_UPLOAD):
            networkInUsage = <LearnedNetwork>state.networkInUsage;
            networkInUsage.input = action.payload;

            return {
                ...state,
                networkInUsage: networkInUsage
            };
        case (NetworkActions.INPUT_IMAGE_DELETE):
            networkInUsage = <LearnedNetwork>state.networkInUsage;
            networkInUsage.input = null;

            return {
                ...state,
                networkInUsage: networkInUsage,
                networkRunResult: null
            };
        case (NetworkActions.EFFECT_ERROR):
            return {
                ...state,
                processing: false,
                processingError: action.payload
            };
        default:
            return state;
    }
}
