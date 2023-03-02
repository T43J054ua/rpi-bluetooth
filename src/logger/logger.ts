import { LogLevel } from "./types/logger.types";


export class Logger {
    private readonly loggedClass: string;

    constructor(classInstance: InstanceType<any>) {
        console.log('initializing logger')
        this.loggedClass = classInstance.constructor.name;
        console.log(`${this.loggedClass} logger initialized`)
    }

    private message(level: LogLevel, messageData: any): string {
        return `${level} :: ${this.loggedClass} :: ${messageData}`;
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