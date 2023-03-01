import { LogLevel } from "./types/logger.types";


export class Logger {
    private readonly file: string;

    constructor(classInstance: InstanceType<any>) {
        this.file = classInstance.name;
    }

    private message(level: LogLevel, messageData: any): string {
        return `${LogLevel} :: ${this.file} :: ${messageData}`;
    }

    public info(data: any): void {
        console.log(this.message(LogLevel.Info, data));
    }

    public debug(data: any): void {
        console.log(this.message(LogLevel.Debug, "Object Data"));
        console.log(`================================================================`);
        console.log(`================================================================`);
        console.dir(data);
        console.log(`================================================================`);
        console.log(`================================================================`);
    }

    public warn(data: any): void {
        console.warn(this.message(LogLevel.Warn, data));
    }

    public error(data: any): void {
        console.error(this.message(LogLevel.Error, data));
    }
}