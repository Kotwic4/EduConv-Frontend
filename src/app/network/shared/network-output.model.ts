export class NetworkOutput {
    private _neurones;
    private _classification;

    // TODO rezultat uruchomienia sieci
    constructor() {

    }

    get neurones() {
        return this._neurones;
    }

    set neurones(value) {
        this._neurones = value;
    }

    get classification() {
        return this._classification;
    }

    set classification(value) {
        this._classification = value;
    }
}
