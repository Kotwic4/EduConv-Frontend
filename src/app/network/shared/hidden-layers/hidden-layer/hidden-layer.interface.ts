export abstract class HiddenLayer {
    public layer_name: String;
    public args: any;

    public getNeurons() {
        return 0;
    }

    public setNeurons(number: number): void {
    }

    public haveNeurons(): boolean {
        return false;
    }
}
