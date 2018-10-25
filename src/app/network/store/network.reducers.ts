import * as NetworkActions from './network.actions';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import {HiddenLayer} from '../shared/hidden-layers/hidden-layer/layers/hidden-layer.model';
import {LearnSettings} from '../learn/learn-settings/learn-settings.model';
import {LearnedNetworkInfo} from '../shared/learned-network-info.model';
import {DatasetInfo} from '../shared/dataset-info.model';

export interface State {
    uploadedNetwork?: String;
    networkInUsage?: UnlearnedNetwork | LearnedNetwork;
    networkInUsageID?: number;
    networkRunResult?: NetworkOutput;
    processing: boolean;
    processingError?: any;
    id?: number;
    datasets?: DatasetInfo[];
    dataset?: DatasetInfo;
    learnSettings?: LearnSettings;
    unlearnedNetworks?: UnlearnedNetwork[];
    learnedNetworks?: LearnedNetworkInfo[];
}

const initialState: State = {
    processing: false,
};


export function networkReducer(state = initialState, action: NetworkActions.NetworkActions) {
    let networkInUsage;
    let layer: HiddenLayer;

    switch (action.type) {
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
                networkInUsage: action.payload,
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
                networkInUsage: null,
            };
        case (NetworkActions.FETCH_UNLEARNED_NETWORK_SUCCESS):
            return {
                ...state,
                networkInUsage: action.payload,
            };
        case (NetworkActions.START_LEARNING_NETWORK):
            return {
                ...state,
                id: null,
                learnSettings: new LearnSettings('mnist', 1, 128),
            };
        case (NetworkActions.SET_LEARN_SETTINGS):
            return {
                ...state,
                learnSettings: action.payload,
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
                processing: false,
                processingError: null,
                id: action.payload
            };
        case (NetworkActions.FETCH_LEARNED_NETWORK):
            return {
                ...state,
                networkRunResult: null
            };
        case (NetworkActions.START_RUNNING_NETWORK):
            return {
                ...state,
                networkInUsage: action.payload
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
            return {
                ...state
            };
        case (NetworkActions.INPUT_IMAGE_UPLOAD_SUCCESS):
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
        case (NetworkActions.FETCH_DATASETS):
            return {
                ...state,
                datasets: null,
            };
        case (NetworkActions.FETCH_DATASETS_SUCCESS):
            return {
                ...state,
                datasets: action.payload
            }
        case (NetworkActions.FETCH_DATASET):
            return {
                ...state,
                dataset: null,
            };
        case (NetworkActions.FETCH_DATASET_SUCCESS):
            return {
                ...state,
                dataset: action.payload
            };
        case (NetworkActions.FETCH_ALL_UNLEARNED_NETWORKS):
            return {
                ...state,
                unlearnedNetworks: null,
            };
        case (NetworkActions.FETCH_ALL_UNLEARNED_NETWORKS_SUCCESS):
            return {
                ...state,
                unlearnedNetworks: action.payload,
            };
        case (NetworkActions.FETCH_ALL_LEARNED_NETWORKS):
            return {
                ...state,
                learnedNetworks: null,
            };
        case (NetworkActions.FETCH_ALL_LEARNED_NETWORKS_SUCCESS):
            return {
                ...state,
                learnedNetworks: action.payload,
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
