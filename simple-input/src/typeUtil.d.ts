export declare const toReadOnly: <T>(...args: T[]) => readonly T[];
export declare const createEmptyObj: <T extends string, U extends unknown>() => { [K in T]: U; };
export declare const createMatchingObj: <T extends string>(...args: T[]) => { [K in T]: K; };
