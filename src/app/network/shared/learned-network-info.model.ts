import {DatasetInfo} from './dataset-info.model';

export class LearnedNetworkInfo {
    constructor(
        private _id: number,
        private _name: String,
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

    get name(): String {
        return this._name;
    }

    public static fromJSON(networkData): LearnedNetworkInfo {
        const datasetData = networkData.dataset;
        const datasetInfo = DatasetInfo.fromJSON(datasetData);
        return new LearnedNetworkInfo(
            networkData.id,
            networkData.name,
            datasetInfo,
            networkData.epochs_learnt,
            networkData.epochs_to_learn,
        );
    }
}
