export class DatasetInfo {
    constructor(
        private _id: number,
        private _name: string,
        private _trainImagesCount: number,
        private _testImagesCount: number,
        private _imgWidth: number,
        private _imgHeight: number,
        private _imgDepth: number,
        private _labels: string[],
    ) {
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get trainImagesCount(): number {
        return this._trainImagesCount;
    }

    get testImagesCount(): number {
        return this._testImagesCount;
    }

    get imgWidth(): number {
        return this._imgWidth;
    }

    get imgHeight(): number {
        return this._imgHeight;
    }

    get imgDepth(): number {
        return this._imgDepth;
    }

    get labels(): string[] {
        return this._labels;
    }

    public static fromJSON(datasetData: any): DatasetInfo {
        return new DatasetInfo(
            datasetData.id,
            datasetData.name,
            datasetData.train_images_count,
            datasetData.test_images_count,
            datasetData.img_width,
            datasetData.img_height,
            datasetData.img_depth,
            datasetData.labels,
        );
    }
}
