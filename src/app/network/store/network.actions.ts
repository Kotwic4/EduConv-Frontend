import { Action } from '@ngrx/store';
import {Network} from '../shared/network.model';
import {LearnedNetwork} from '../shared/learned-network.model';
import {NetworkOutput} from '../shared/network-output.model';

export const INPUT_IMAGE_UPLOAD = 'INPUT_IMAGE_UPLOAD';
export const INPUT_IMAGE_DELETE = 'INPUT_IMAGE_DELETE';
export const NETWORK_START = 'NETWORK_START';
export const NETWORK_UPLOAD = 'NETWORK_UPLOAD';
export const NEURONE_ADD = 'NEURONE_ADD';
export const NEURONE_DELETE = 'NEURONE_DELETE';
export const HIDDEN_LAYER_ADD = 'HIDDEN_LAYER_ADD';
export const HIDDEN_LAYER_CHANGE_TYPE = 'HIDDEN_LAYER_CHANGE_TYPE';
export const HIDDEN_LAYER_CHANGE_POSITION = 'HIDDEN_LAYER_CHANGE_POSITION';

export const START_MODELING_NETWORK = 'START_MODELING_NETWORK';
export const MODEL_NETWORK = 'MODEL_NETWORK';
export const END_MODELING_NETWORK = 'END_MODELING_NETWORK';

export const START_LEARNING_NETWORK = 'START_LEARNING_NETWORK';
export const LEARN_NETWORK = 'LEARN_NETWORK';
export const END_LEARNING_NETWORK = 'END_LEARNING_NETWORK';

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

    constructor(public payload: { layer: number, neurone: number }) {}
}

export class HiddenLayerAdd implements Action {
    readonly type = HIDDEN_LAYER_ADD;

    constructor() {}
}

export class HiddenLayerChangeType implements Action {
    readonly type = HIDDEN_LAYER_CHANGE_TYPE;

    constructor(public payload: { index: number, type: HiddenLayerChangeType }) {}
}

export class HiddenLayerChangePosition implements Action {
    readonly type = HIDDEN_LAYER_CHANGE_POSITION;

    constructor(public payload: { oldIndex: number, newIndex: number }) {}
}

export class StartModelingNetwork implements Action {
    readonly type = START_MODELING_NETWORK;
}

export class ModelNetwork implements Action {
    readonly type = MODEL_NETWORK;
}

export class EndModelingNetwork implements Action {
    readonly type = END_MODELING_NETWORK;

    constructor(public payload: Network) {}
}

export class StartLearningNetwork implements Action {
    readonly type = START_LEARNING_NETWORK;

    constructor(public payload: Network) {}
}

export class LearnNetwork implements Action {
    readonly type = LEARN_NETWORK;
}

export class EndLearningNetwork implements Action {
    readonly type = END_LEARNING_NETWORK;

    constructor(public payload: LearnedNetwork) {}
}

export class StartRunningNetwork implements Action {
    readonly type = START_RUNNING_NETWORK;

    constructor(public payload: Network) {}
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
    HiddenLayerChangePosition |
    StartModelingNetwork |
    ModelNetwork |
    EndModelingNetwork |
    StartLearningNetwork |
    LearnNetwork |
    EndLearningNetwork |
    StartRunningNetwork |
    RunNetwork |
    EndRunningNetwork;

