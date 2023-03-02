import { v4 as uuid } from 'uuid';

export class UtilityService {
    constructor() {}
    public newUUID(): string {
        return uuid();
    }
};

export const utilityService: UtilityService = new UtilityService();