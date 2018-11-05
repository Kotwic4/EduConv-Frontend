export class EpochDataInfo {
    constructor(
        private _acc: number,
        private _loss: number,
        private _epochNumber: number,
    ) {
    }

    get acc(): number {
        return this._acc;
    }

    get loss(): number {
        return this._loss;
    }

    get epochNumber(): number {
        return this._epochNumber;
    }

    public static fromJSON(epochData): EpochDataInfo {
        return new EpochDataInfo(
            epochData.acc,
            epochData.loss,
            epochData.epoch_number,
        );
    }
}
