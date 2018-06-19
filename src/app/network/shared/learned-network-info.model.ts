import {DatasetInfo} from './dataset-info.model';

export class LearnedNetworkInfo {
    constructor(
        private _id: number,
        private _dataset: DatasetInfo,
        private _epochsLearnt: number,
        private _epochsToLearn: number,
    ) {
    }

    get id(): number {
        return this._id;
    }

    get dataset(): DatasetInfo {
        return this._dataset;
    }

    get epochsLearnt(): number {
        return this._epochsLearnt;
    }

    get epochsToLearn(): number {
        return this._epochsToLearn;
    }
}
