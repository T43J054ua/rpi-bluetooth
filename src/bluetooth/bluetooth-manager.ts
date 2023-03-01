import bleno from '@abandonware/bleno';
import { Logger } from '../logger/logger';
import { AdapterState, Bleno, EAdapterState } from './types/bleno.types';

export class BluetoothManager {
    private readonly bleInterface: Bleno = bleno;
    private readonly logger: Logger;
    
    constructor() {
        this.logger = new Logger(this);
        this.registerHandlers();
    }

    private async registerHandlers() {
        this.bleInterface.on("stateChange", this.handleAdapterStateChange);
    }

    private handleAdapterStateChange(state: AdapterState): void {
        this.logger.info('Handling state change');
        this.logger.info(state);
        if(state === EAdapterState.On) {
            this.startAdvertising();
            return;
        } else if(state === EAdapterState.Off || state === EAdapterState.Reset) {
            this.logger.warn(`Bluetooth adapter is ${state}`);
            return;
        }
        this.logger.error(`Unable to start bluetooth adapter - reason: ${state}`);
    }

    public startAdvertising(): void {
        this.logger.info("Starting advertisement");
        this.bleInterface.startAdvertising("Raspberry Pi BLE");
    }
}