export class NetworkOutput {
    constructor(
        private _activationImages,
        private _activationHistograms,
        private _classification
    ) {
    }

    get activationImages() {
        return this._activationImages;
    }

    get classification() {
        return this._classification;
    }
}
