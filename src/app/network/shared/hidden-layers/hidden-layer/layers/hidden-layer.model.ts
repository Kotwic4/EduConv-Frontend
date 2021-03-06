export abstract class HiddenLayer {
    public layer_name: String;
    public args: any;
    private _neurons = 1;
    private _haveNeurons = false;

    public getNeurons() {
        return this._neurons;
    }

    public setNeurons(number: number): void {
        this._neurons = number;
        this._haveNeurons = true;
    }

    public haveNeurons(): boolean {
        return this._haveNeurons;
    }

    public setHaveNeurons(value: boolean): void {
        this._haveNeurons = value;
    }

    public setArgs(args: any) {
    }

    public getArgsFromLayer(layer: any) {
    }

}
