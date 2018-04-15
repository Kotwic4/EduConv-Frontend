import { Action } from '@ngrx/store';

export const INPUT_IMAGE_UPLOAD = 'INPUT_IMAGE_UPLOAD';
export const INPUT_IMAGE_DELETE = 'INPUT_IMAGE_DELETE';

export class InputImageUpload implements Action {
    readonly type = INPUT_IMAGE_UPLOAD;

    constructor(public payload: String) {}
}

export class InputImageDelete implements Action {
    readonly type = INPUT_IMAGE_DELETE;

    constructor() {}
}

export type NetworkActions =
    InputImageUpload |
    InputImageDelete;
