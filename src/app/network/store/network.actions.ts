import { Action } from '@ngrx/store';

export const INPUT_IMAGE_UPLOAD = 'INPUT_IMAGE_UPLOAD';
export const INPUT_IMAGE_DELETE = 'INPUT_IMAGE_DELETE';
export const NETWORK_START = 'NETWORK_START';
export const NETWORK_UPLOAD = 'NETWORK_UPLOAD';
export const NEURONE_ADD = 'NEURONE_ADD';
export const NEURONE_DELETE = 'NEURONE_DELETE';
export const HIDDEN_LAYER_ADD = 'HIDDEN_LAYER_ADD';
export const HIDDEN_LAYER_CHANGE_TYPE = 'HIDDEN_LAYER_CHANGE_TYPE';

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

export type NetworkActions =
    InputImageUpload |
    InputImageDelete |
    NetworkUpload |
    NeuroneAdd |
    NeuroneDelete |
    HiddenLayerAdd |
    HiddenLayerChangeType;
