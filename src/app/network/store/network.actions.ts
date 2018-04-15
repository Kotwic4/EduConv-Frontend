import { Action } from '@ngrx/store';

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export class UploadImage implements Action {
    readonly type = UPLOAD_IMAGE;

    constructor(public payload: String) {}
}

export type NetworkActions =
  UploadImage;
