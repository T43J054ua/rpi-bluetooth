import bleno from '@abandonware/bleno';
import { Logger } from '../logger/logger';
import { AdapterState, BLEEvent, Bleno, EAdapterState } from './types/bleno.types';

export class BluetoothManager {
    private readonly logger: Logger;
    private readonly bleInterface: Bleno = bleno;
    
    constructor() {
        this.logger = new Logger(this);
        this.registerInterfaceHandlers();
    }

    private registerHandler(event: BLEEvent, handler: Function): void {
        const boundHandler = handler.bind(this);
        this.bleInterface.on(event, (eventProvidedData?: unknown) => boundHandler(eventProvidedData));
    }

    private async registerInterfaceHandlers(): Promise<void> {
        this.registerHandler(BLEEvent.AdapterStateChange, this.handleAdapterStateChange);
        this.registerHandler(BLEEvent.AdvertisingStart, this.handleAdvertisingStart);
        this.registerHandler(BLEEvent.AdvertisingStartError, this.handleAdvertisingStartError);
    }

    private handleAdapterStateChange(state: AdapterState): void {
        this.logger.info('Handling adapter state change');
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

    private handleAdvertisingStart(): void {
        this.logger.info("Starting advertisement broadcast");
    }

    private handleAdvertisingStartError(startError: Error): void {
        const errorMessage = startError.message ?? JSON.stringify(startError, null, 2);
        this.logger.error(`Error starting advertiser: ${errorMessage}`);
        throw new Error(`Unable to start advertiser: ${errorMessage}`);
    }

    public startAdvertising(): void {
        this.bleInterface.startAdvertising("☠️ Node Bluetooth Device ☠️");
    }
};
