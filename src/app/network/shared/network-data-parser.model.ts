export class NetworkDataParser {

    static generateActivationImage(outData) {
        const canvas = <HTMLCanvasElement>document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const result = [];
        const shape = outData.shape;
        const data = Array.from(outData.dataSync());
        const _min: any = Math.min.apply(null, data);
        const _max: any = Math.max.apply(null, data);
        const conf = (_max - _min) / 255;

        if (shape.length === 2) {
            const X = shape[1];

            for (let i = 0; i < X; i++) {
                const value: any = data[i];
                const color = (value - _min) / conf;

                canvas.width  = 1;
                canvas.height = 1;
                ctx.fillStyle = `rgb(${color},${color},${color})`;
                ctx.fillRect(0, 0, 1, 1);
                result.push(canvas.toDataURL());
            }
        }
        else {
            const X = shape[1];
            const Y = shape[2];
            const Z = shape[3];

            for (let n = 0; n < Z; n++) {
                canvas.width  = X;
                canvas.height = Y;

                for (let i = 0; i < X; i++) {
                    for (let j = 0; j < Y; j++) {
                        const index = n + (i * Z) + (j * Z * X);
                        const value: any = data[index];
                        const color = (value - _min) / conf;
                        ctx.fillStyle = `rgb(${color},${color},${color})`;
                        ctx.fillRect(i, j, i + 1, j + 1);
                    }
                }

                result.push(canvas.toDataURL());
            }
        }

        return result;
    }

    static generateActivationHistogram(outData) {
        const result = new Map<number, number>();
        const data: any = Array.from(outData.dataSync());
        const _min: any = Math.min.apply(null, data);
        const _max: any = Math.max.apply(null, data);
        const conf = (_max - _min);
        const howManyDigets = 2;

        for (let i = 0; i < data.length; i++) {
            const dataValue: any = data[i];
            const key = +((dataValue - _min) / conf).toFixed(howManyDigets);
            const value =  result.has(key) ? result.get(key) + 1 : 1;
            result.set(key, value);
        }

        return result;
    }
}
