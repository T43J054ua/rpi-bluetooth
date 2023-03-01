import { BluetoothManager } from "./bluetooth/bluetooth-manager.base";

export class Application {
    private bleManager?: BluetoothManager;

    constructor() {}

    public async start(): Promise<void> {
        this.bleManager = new BluetoothManager();
    }
}

export const application = new Application();