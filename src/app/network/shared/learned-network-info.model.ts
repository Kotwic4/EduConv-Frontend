import {DatasetInfo} from './dataset-info.model';
import {EpochDataInfo} from './epoch-data-info.model';

export class LearnedNetworkInfo {
    constructor(
        private _id: number,
        private _name: String,
        private _dataset: DatasetInfo,
        private _epochsLearnt: number,
        private _epochsToLearn: number,
        private _batchSize: number,
        private _modelId: number,
        private _epochsData: EpochDataInfo[],
        private _numberOfLayers: number,
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


    get batchSize(): number {
        return this._batchSize;
    }

    get modelId(): number {
        return this._modelId;
    }

    get epochsData(): EpochDataInfo[] {
        return this._epochsData;
    }

    get numberOfLayers(): number {
        return this._numberOfLayers;
    }

    get accuracy(): number {
        const lastEpochData = this._epochsData[this._epochsData.length - 1];
        return (lastEpochData && lastEpochData.acc) || 0;
    }

    public static fromJSON(networkData): LearnedNetworkInfo {
        const datasetData = networkData.dataset;
        const datasetInfo = DatasetInfo.fromJSON(datasetData);
        const epochDatas = networkData.epochs_data.map(epoch_data => EpochDataInfo.fromJSON(epoch_data));
        return new LearnedNetworkInfo(
            networkData.id,
            networkData.name,
            datasetInfo,
            networkData.epochs_learnt,
            networkData.epochs_to_learn,
            networkData.batch_size,
            networkData.model_id,
            epochDatas,
            networkData.number_of_layers,
        );
    }
}
