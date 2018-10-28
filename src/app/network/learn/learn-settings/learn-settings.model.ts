export class LearnSettings {
    constructor(
        public modelName: string,
        public dataset: string,
        public epochs: number,
        public batchSize: number,
    ) {
    }
}
