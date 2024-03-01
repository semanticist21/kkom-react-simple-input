import * as React from "react";
interface UseInputType<T extends readonly string[], E extends readonly string[], U extends readonly string[]> {
    /**
     * values - state values containing input keys
     */
    values: {
        [key in T[number]]: string;
    } & {
        [key in E[number]]: boolean;
    } & {
        [key in U[number]]: number;
    };
    /**
     * setValues - state setter for values
     */
    setValues: React.Dispatch<React.SetStateAction<{
        [K in T[number]]: K;
    } & {
        [K in E[number]]: K;
    } & {
        [K in U[number]]: K;
    }>>;
    /**
     * matching - object containing input keys, use it for giving id or name to input elements
     */
    matching: Readonly<{
        [K in T[number]]: K;
    } & {
        [K in E[number]]: K;
    } & {
        [K in U[number]]: K;
    }>;
    /**
     * handlers - simple input change handlers
     */
    handlers: {
        handleString: (id?: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleCheck: (id?: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleNumber: (id?: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
    /**
     * keys - readonly array containing input keys
     */
    keys: {
        allKeys: readonly [...T, ...E, ...U];
        stringKeys: readonly [...T];
        boolKeys: readonly [...E];
        numberKeys: readonly [...U];
    };
}
interface HandleProps<T extends string, E extends string, U extends string> {
    strings?: readonly T[];
    booleans?: readonly E[];
    numbers?: readonly U[];
}
/**
 * @description useInputHandle
 * @param keys input keys
 * @returns {Object} containing values, setValues, handlers, matching, keys
 */
export declare const useInputHandle: <T extends string, E extends string, U extends string>({ strings, booleans, numbers, }: HandleProps<T, E, U>) => UseInputType<T[], E[], U[]>;
export {};
