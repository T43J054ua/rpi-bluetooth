import { PrimaryService } from "bleno";
import { Logger } from "../logger/logger";
import { UtilityService, utilityService } from "../services/utilities/utility.service";
import { BLECharacteristic } from "./types/bleno.types";

export class BluetoothService {
    private readonly utilityService: UtilityService = utilityService;
    private readonly logger: Logger;
    public readonly characteristics: BLECharacteristic[] = [];
    public readonly uuid: string;
    public serviceInterface?: PrimaryService;

    constructor(characteristics?: BLECharacteristic[]) {
        this.uuid = this.utilityService.newUUID();
        this.logger = new Logger(this);
        if(characteristics?.length) {
            this.characteristics = [...characteristics];
            this.generatePrimaryService();
        }
    }

    private generatePrimaryService(): void {
        this.serviceInterface = new PrimaryService({
            uuid: this.uuid,
            characteristics: this.characteristics
        });
    }

    public addCharacteristic(characteristic: BLECharacteristic): void {
        this.characteristics.push(characteristic);
    }

    public initializeService(): void {
        if(!this.characteristics.length) {
            this.logger.error("Unable to initialize a bluetooth service with no characteristics");
            return;
        }
        this.generatePrimaryService();
    }
}