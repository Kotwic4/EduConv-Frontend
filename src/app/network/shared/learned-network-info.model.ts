export class LearnedNetworkInfo {
    constructor(
        private _id: number,
        private _dataset: string,
        private _epochsLearnt: number,
        private _epochsToLearn: number,
    ) {
    }

    get id(): number {
        return this._id;
    }

    get dataset(): string {
        return this._dataset;
    }

    get epochsLearnt(): number {
        return this._epochsLearnt;
    }

    get epochsToLearn(): number {
        return this._epochsToLearn;
    }
}
