import bleno from '@abandonware/bleno';
import { Bleno } from 'bleno';

export class Logger {
    private readonly file: string;

    constructor(classInstance: InstanceType<any>) {
        this.file = classInstance.name;
    }

    public warn(data: any): void {
        console.warn(data);
    }

    public info(data: any): void {
        console.log(data);
    }

    public error(data: any): void {
        console.error(data);
    }

    public objectData(data: any): void {
        console.dir(data);
    }
}

export class BluetoothManager {
    private readonly bleInterface: Bleno = bleno;
    private readonly logger: Logger;
    
    constructor() {
        this.logger = new Logger(this);
        this.registerHandlers();
    }

    private async registerHandlers() {
        this.bleInterface.on("stateChange", (event: unknown) => this.handleStateChange(event));
    }

    private handleStateChange(event: unknown): void {
        this.logger.info('Handling state change');
        this.logger.objectData(event);
    }
}