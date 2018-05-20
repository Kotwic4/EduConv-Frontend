import { Action } from '@ngrx/store';
import {UnlearnedNetwork} from '../shared/unlearned-network.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import {NetworkOutput} from '../shared/network-output.model';
import {HiddenLayer} from '../shared/hidden-layers/hidden-layer/layers/hidden-layer.model';

export const INPUT_IMAGE_UPLOAD = 'INPUT_IMAGE_UPLOAD';
export const INPUT_IMAGE_DELETE = 'INPUT_IMAGE_DELETE';
export const NETWORK_START = 'NETWORK_START';
export const NETWORK_UPLOAD = 'NETWORK_UPLOAD';
export const NEURONE_ADD = 'NEURONE_ADD';
export const NEURONE_DELETE = 'NEURONE_DELETE';
export const HIDDEN_LAYER_ADD = 'HIDDEN_LAYER_ADD';
export const HIDDEN_LAYER_CHANGE_TYPE = 'HIDDEN_LAYER_CHANGE_TYPE';
export const HIDDEN_LAYER_CHANGE_ARGS = 'HIDDEN_LAYER_CHANGE_ARGS';

export const START_MODELING_NETWORK = 'START_MODELING_NETWORK';
export const MODEL_NETWORK = 'MODEL_NETWORK';
export const END_MODELING_NETWORK = 'END_MODELING_NETWORK';

export const FETCH_UNLEARNED_NETWORK = 'FETCH_UNLEARNED_NETWORK';
export const START_LEARNING_NETWORK = 'START_LEARNING_NETWORK';
export const LEARN_NETWORK = 'LEARN_NETWORK';
export const END_LEARNING_NETWORK = 'END_LEARNING_NETWORK';

export const FETCH_LEARNED_NETWORK = 'FETCH_LEARNED_NETWORK';
export const START_RUNNING_NETWORK = 'START_RUNNING_NETWORK';
export const RUN_NETWORK = 'RUN_NETWORK';
export const END_RUNNING_NETWORK = 'END_RUNNING_NETWORK';

export class InputImageUpload implements Action {
    readonly type = INPUT_IMAGE_UPLOAD;

    constructor(public payload: String) {}
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

export class NeuroneAdd implements Action {
    readonly type = NEURONE_ADD;

    constructor(public payload: number) {}
}

export class NeuroneDelete implements Action {
    readonly type = NEURONE_DELETE;

    constructor(public payload: number) {}
}

export class HiddenLayerAdd implements Action {
    readonly type = HIDDEN_LAYER_ADD;

    constructor(public payload: HiddenLayer) {}
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
}

export class ModelNetwork implements Action {
    readonly type = MODEL_NETWORK;
}

export class EndModelingNetwork implements Action {
    readonly type = END_MODELING_NETWORK;

    constructor(public payload: UnlearnedNetwork) {}
}

export class FetchUnlearnedNetwork implements Action {
    readonly type = FETCH_UNLEARNED_NETWORK;

    constructor(public payload: number) {}
}

export class StartLearningNetwork implements Action {
    readonly type = START_LEARNING_NETWORK;

    constructor(public payload: UnlearnedNetwork) {}
}

export class LearnNetwork implements Action {
    readonly type = LEARN_NETWORK;

    constructor(public payload: number) {}
}

export class EndLearningNetwork implements Action {
    readonly type = END_LEARNING_NETWORK;

    constructor(public payload: LearnedNetwork) {}
}

export class FetchLearnedNetwork implements Action {
    readonly type = FETCH_LEARNED_NETWORK;

    constructor(public payload: number) {}
}

export class StartRunningNetwork implements Action {
    readonly type = START_RUNNING_NETWORK;

    constructor(public payload: UnlearnedNetwork) {}
}

export class RunNetwork implements Action {
    readonly type = RUN_NETWORK;
}

export class EndRunningNetwork implements Action {
    readonly type = END_RUNNING_NETWORK;

    constructor(public payload: NetworkOutput) {}
}

export type NetworkActions =
    InputImageUpload |
    InputImageDelete |
    NetworkUpload |
    NeuroneAdd |
    NeuroneDelete |
    HiddenLayerAdd |
    HiddenLayerChangeType |
    HiddenLayerChangeArgs |
    StartModelingNetwork |
    ModelNetwork |
    EndModelingNetwork |
    FetchUnlearnedNetwork |
    StartLearningNetwork |
    LearnNetwork |
    EndLearningNetwork |
    FetchLearnedNetwork |
    StartRunningNetwork |
    RunNetwork |
    EndRunningNetwork;

