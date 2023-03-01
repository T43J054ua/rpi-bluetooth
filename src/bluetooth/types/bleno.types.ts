// Type definitions for bleno 0.4
// Project: https://github.com/sandeepmistry/bleno
// Definitions by: Manuel Francisco Naranjo <naranjo.manuel@gmail.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

export type State = 'poweredOn' | 'poweredOff' | 'unauthorized' | 'unsupported' | 'unknown' | 'resetting';

export type Property = 'read' | 'write' | 'indicate' | 'notify' | 'writeWithoutResponse';

export interface CharacteristicOptions {
    uuid: string;
    properties?: ReadonlyArray<Property> | null | undefined;
    secure?: ReadonlyArray<Property> | null | undefined;
    value?: Buffer | null | undefined;
    descriptors?: ReadonlyArray<Descriptor> | null | undefined;
    onIndicate?: (() => void) | null | undefined;
    onNotify?: (() => void) | null | undefined;
    onReadRequest?: ((
        offset: number,
        callback: (result: number, data?: Buffer) => void
    ) => void) | null | undefined;
    onSubscribe?: ((maxValueSize: number, updateValueCallback: any) => void) | null | undefined;
    onUnsubscribe?: (() => void) | null | undefined;
    onWriteRequest?: ((
        data: Buffer,
        offset: number,
        withoutResponse: boolean,
        callback: (result: number) => void
    ) => void) | null | undefined;
}

export declare class Characteristic {
    uuid: string;
    properties: ReadonlyArray<Property>;
    secure: ReadonlyArray<Property>;
    value: Buffer | null;
    descriptors: ReadonlyArray<Descriptor>;

    constructor(options: CharacteristicOptions);

    onIndicate(): void;

    onNotify(): void;

    onReadRequest(offset: number, callback: (result: number, data?: Buffer) => void): void;

    onSubscribe(maxValueSize: number, updateValueCallback: any): void;

    onUnsubscribe(): void;

    onWriteRequest(data: Buffer, offset: number, withoutResponse: boolean, callback: (result: number) => void): void;

    toString(): string;

    readonly RESULT_ATTR_NOT_LONG: number;

    readonly RESULT_INVALID_ATTRIBUTE_LENGTH: number;

    readonly RESULT_INVALID_OFFSET: number;

    readonly RESULT_SUCCESS: number;

    readonly RESULT_UNLIKELY_ERROR: number;

    static readonly RESULT_ATTR_NOT_LONG: number;

    static readonly RESULT_INVALID_ATTRIBUTE_LENGTH: number;

    static readonly RESULT_INVALID_OFFSET: number;

    static readonly RESULT_SUCCESS: number;

    static readonly RESULT_UNLIKELY_ERROR: number;
}

export interface DescriptorOptions {
    uuid: string;
    value?: Buffer | string | null | undefined;
}

export declare class Descriptor {
    uuid: string;
    value: Buffer;

    constructor(options: DescriptorOptions);

    toString(): string;
}

export interface PrimaryServiceOptions {
    uuid: string;
    characteristics?: ReadonlyArray<Characteristic> | null | undefined;
}

export declare class PrimaryService {
    uuid: string;
    characteristics: ReadonlyArray<Characteristic>;

    constructor(options: PrimaryServiceOptions);

    toString(): string;
}

export interface Bleno extends NodeJS.EventEmitter {
    readonly Characteristic: typeof Characteristic;
    readonly Descriptor: typeof Descriptor;
    readonly PrimaryService: typeof PrimaryService;

    readonly address: string;

    readonly mtu: number;

    readonly platform: string;

    readonly rssi: number;

    readonly state: State;

    disconnect(): void;

    setServices(services: ReadonlyArray<PrimaryService>, callback?: (arg: Error | undefined | null) => void): void;

    startAdvertising(name: string, serviceUuids?: ReadonlyArray<string>, callback?: (arg: Error | undefined | null) => void): void;

    startAdvertisingIBeacon(uuid: string, major: number, minor: number, measuredPower: number, callback?: (arg: Error | undefined | null) => void): void;

    startAdvertisingWithEIRData(advertisementData: Buffer, callback?: (arg: Error | undefined | null) => void): void;
    startAdvertisingWithEIRData(advertisementData: Buffer, scanData: Buffer, callback?: (arg: Error | undefined | null) => void): void;

    stopAdvertising(callback?: () => void): void;

    updateRssi(callback?: (err: null, rssi: number) => void): void;

    on(event: 'stateChange', cb: (state: State) => void): this;
    on(event: 'accept', cb: (address: string) => void): this;
    on(event: 'mtuChange', cb: (mtu: number) => void): this;
    on(event: 'disconnect', cb: (clientAddress: string) => void): this;
    on(event: 'advertisingStart', cb: (err?: Error | null) => void): this;
    on(event: 'advertisingStartError', cb: (err: Error) => void): this;
    on(event: 'advertisingStop', cb: () => void): this;
    on(event: 'servicesSet', cb: (err?: Error | null) => void): this;
    on(event: 'servicesSetError', cb: (err: Error) => void): this;
    on(event: 'rssiUpdate', cb: (rssi: number) => void): this;
}