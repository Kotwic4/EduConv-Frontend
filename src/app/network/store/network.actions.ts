import { Action } from '@ngrx/store';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {HiddenLayer} from '../shared/hidden-layers/hidden-layer/layers/hidden-layer.model';
import {LearnSettings} from '../learn/learn-settings/learn-settings.model';
import {LearnedNetworkInfo} from '../shared/learned-network-info.model';
import {DatasetInfo} from '../shared/dataset-info.model';

export const INPUT_IMAGE_UPLOAD = 'INPUT_IMAGE_UPLOAD';
export const INPUT_IMAGE_UPLOAD_SUCCESS = 'INPUT_IMAGE_UPLOAD_SUCCESS';
export const INPUT_IMAGE_DELETE = 'INPUT_IMAGE_DELETE';

export const NETWORK_START = 'NETWORK_START';
export const NETWORK_UPLOAD = 'NETWORK_UPLOAD';
export const NEURONE_CHANGE = 'NEURONE_CHANGE';
export const HIDDEN_LAYER_ADD = 'HIDDEN_LAYER_ADD';
export const HIDDEN_LAYER_REMOVE = 'HIDDEN_LAYER_REMOVE';
export const HIDDEN_LAYER_CHANGE_TYPE = 'HIDDEN_LAYER_CHANGE_TYPE';
export const HIDDEN_LAYER_CHANGE_ARGS = 'HIDDEN_LAYER_CHANGE_ARGS';

export const START_MODELING_NETWORK = 'START_MODELING_NETWORK';
export const MODEL_NETWORK = 'MODEL_NETWORK';
export const END_MODELING_NETWORK = 'END_MODELING_NETWORK';

export const FETCH_UNLEARNED_NETWORK = 'FETCH_UNLEARNED_NETWORK';
export const FETCH_UNLEARNED_NETWORK_SUCCESS = 'FETCH_UNLEARNED_NETWORK_SUCCESS';

export const START_LEARNING_NETWORK = 'START_LEARNING_NETWORK';
export const SET_LEARN_SETTINGS = 'SET_LEARN_SETTINGS';
export const LEARN_NETWORK = 'LEARN_NETWORK';
export const END_LEARNING_NETWORK = 'END_LEARNING_NETWORK';

export const FETCH_LEARNED_NETWORK = 'FETCH_LEARNED_NETWORK';
export const START_RUNNING_NETWORK = 'START_RUNNING_NETWORK';
export const RUN_NETWORK = 'RUN_NETWORK';
export const END_RUNNING_NETWORK = 'END_RUNNING_NETWORK';

export const FETCH_DATASETS = 'FETCH_DATASETS';
export const FETCH_DATASETS_SUCCESS = 'FETCH_DATASETS_SUCCESS';
export const FETCH_DATASET = 'FETCH_DATASET';
export const FETCH_DATASET_SUCCESS = 'FETCH_DATASET_SUCCESS';

export const FETCH_ALL_UNLEARNED_NETWORKS = 'FETCH_ALL_UNLEARNED_NETWORKS';
export const FETCH_ALL_UNLEARNED_NETWORKS_SUCCESS = 'FETCH_ALL_UNLEARNED_NETWORKS_SUCCESS';

export const FETCH_ALL_LEARNED_NETWORKS = 'FETCH_ALL_LEARNED_NETWORKS';
export const FETCH_ALL_LEARNED_NETWORKS_SUCCESS = 'FETCH_ALL_LEARNED_NETWORKS_SUCCESS';

export const EFFECT_ERROR = 'EFFECT_ERROR';

export class InputImageUpload implements Action {
    readonly type = INPUT_IMAGE_UPLOAD;

    constructor(public payload: any) {}
}

export class InputImageUploadSuccess implements Action {
    readonly type = INPUT_IMAGE_UPLOAD_SUCCESS;

    constructor(public payload: string) {}
}

export class InputImageDelete implements Action {
    readonly type = INPUT_IMAGE_DELETE;

    constructor() {}
}

export class NetworkStart implements Action {
    readonly type = NETWORK_START;

    constructor() {}
}

export class NetworkUpload implements Action {
    readonly type = NETWORK_UPLOAD;

    constructor(public payload: String) {}
}

export class NeuroneChange implements Action {
    readonly type = NEURONE_CHANGE;

    constructor(public payload: {index: number, amount: number}) {}
}

export class HiddenLayerAdd implements Action {
    readonly type = HIDDEN_LAYER_ADD;

    constructor(public payload: HiddenLayer) {}
}

export class HiddenLayerRemove implements Action {
    readonly type = HIDDEN_LAYER_REMOVE;

    constructor(public payload: number) {}
}

export class HiddenLayerChangeType implements Action {
    readonly type = HIDDEN_LAYER_CHANGE_TYPE;

    constructor(public payload: { index: number, layer: HiddenLayer }) {}
}

export class HiddenLayerChangeArgs implements Action {
    readonly type = HIDDEN_LAYER_CHANGE_ARGS;

    constructor(public payload: { index: number, args: any }) {}
}

export class StartModelingNetwork implements Action {
    readonly type = START_MODELING_NETWORK;

    constructor(public payload: UnlearnedNetwork) {}
}

export class ModelNetwork implements Action {
    readonly type = MODEL_NETWORK;

    constructor(public payload: string) {}
}

export class EndModelingNetwork implements Action {
    readonly type = END_MODELING_NETWORK;

    constructor(public payload: number) {}
}

export class FetchUnlearnedNetwork implements Action {
    readonly type = FETCH_UNLEARNED_NETWORK;

    constructor(public payload: number) {}
}

export class FetchUnlearnedNetworkSuccess implements Action {
    readonly type = FETCH_UNLEARNED_NETWORK_SUCCESS;

    constructor(public payload: UnlearnedNetwork) {}
}

export class StartLearningNetwork implements Action {
    readonly type = START_LEARNING_NETWORK;
}

export class SetLearnSettings implements Action {
    readonly type = SET_LEARN_SETTINGS;

    constructor(public payload: LearnSettings) {}
}

export class LearnNetwork implements Action {
    readonly type = LEARN_NETWORK;

    constructor(public payload: number) {}
}

export class EndLearningNetwork implements Action {
    readonly type = END_LEARNING_NETWORK;

    constructor(public payload: number) {}
}

export class FetchLearnedNetwork implements Action {
    readonly type = FETCH_LEARNED_NETWORK;

    constructor(public payload: number) {}
}

export class StartRunningNetwork implements Action {
    readonly type = START_RUNNING_NETWORK;

    constructor(public payload: LearnedNetwork) {}
}

export class RunNetwork implements Action {
    readonly type = RUN_NETWORK;
}

export class EndRunningNetwork implements Action {
    readonly type = END_RUNNING_NETWORK;

    constructor(public payload: NetworkOutput) {}
}

export class FetchDatasets implements Action {
    readonly type = FETCH_DATASETS;
}

export class FetchDataset implements Action {
    readonly type = FETCH_DATASET;

    constructor(public payload: number) {}
}

export class FetchDatasetsSuccess implements Action {
    readonly type = FETCH_DATASETS_SUCCESS;

    constructor(public payload: DatasetInfo[]) {}
}

export class FetchDatasetSuccess implements Action {
    readonly type = FETCH_DATASET_SUCCESS;

    constructor(public payload: DatasetInfo) {}
}

export class FetchAllUnlearnedNetworks implements Action {
    readonly type = FETCH_ALL_UNLEARNED_NETWORKS;
}

export class FetchAllUnlearnedNetworksSuccess implements Action {
    readonly type = FETCH_ALL_UNLEARNED_NETWORKS_SUCCESS;

    constructor(public payload: UnlearnedNetwork[]) {}
}

export class FetchAllLearnedNetworks implements Action {
    readonly type = FETCH_ALL_LEARNED_NETWORKS;
}

export class FetchAllLearnedNetworksSuccess implements Action {
    readonly type = FETCH_ALL_LEARNED_NETWORKS_SUCCESS;

    constructor(public payload: LearnedNetworkInfo[]) {}
}

export class EffectError implements Action {
    readonly type = EFFECT_ERROR;

    constructor(public payload: any) {}
}

export type NetworkActions =
    InputImageUpload |
    InputImageUploadSuccess |
    InputImageDelete |
    NetworkUpload |
    NeuroneChange |
    HiddenLayerAdd |
    HiddenLayerRemove |
    HiddenLayerChangeType |
    HiddenLayerChangeArgs |
    StartModelingNetwork |
    ModelNetwork |
    EndModelingNetwork |
    FetchUnlearnedNetwork |
    FetchUnlearnedNetworkSuccess |
    StartLearningNetwork |
    SetLearnSettings |
    LearnNetwork |
    EndLearningNetwork |
    FetchLearnedNetwork |
    StartRunningNetwork |
    RunNetwork |
    EndRunningNetwork |
    FetchDatasets |
    FetchDatasetsSuccess |
    FetchDataset |
    FetchDatasetSuccess |
    FetchAllUnlearnedNetworks |
    FetchAllUnlearnedNetworksSuccess |
    FetchAllLearnedNetworks |
    FetchAllLearnedNetworksSuccess |
    EffectError;

