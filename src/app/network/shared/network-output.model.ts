export class NetworkOutput {
    constructor(
        private _neurons,
        private _classification
    ) {
    }

    get neurons() {
        return this._neurons;
    }

    get classification() {
        return this._classification;
    }
}
