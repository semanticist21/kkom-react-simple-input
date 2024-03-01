import * as React from "react";
import { createEmptyObj, createMatchingObj } from "./typeUtil";
/**
 * @description useInputHandle
 * @param keys input keys
 * @returns {Object} containing values, setValues, handlers, matching, keys
 */
export const useInputHandle = ({ strings = [], booleans = [], numbers = [], }) => {
    const stringKeys = [...strings];
    const boolKeys = [...booleans];
    const numberKeys = [...numbers];
    const [values, setValues] = React.useState(Object.assign(createEmptyObj(), createEmptyObj(), createEmptyObj()));
    const matching = React.useMemo(() => {
        return Object.freeze(Object.assign(createMatchingObj(...strings), createMatchingObj(...booleans), createMatchingObj(...numbers)));
    }, []);
    const handleString = React.useCallback((id) => {
        return (e) => {
            const { value, id, name } = e.target;
            // when id
            if (id) {
                if (typeof id !== "string") {
                    throw new Error("Id is not string or undefined");
                }
                if (stringKeys.indexOf(id) === -1) {
                    throw new Error("Id is not valid key");
                }
                setValues((prev) => (Object.assign(Object.assign({}, prev), { [id]: value })));
            }
            // when name
            else {
                if (typeof name !== "string") {
                    throw new Error("Id is not string or undefined");
                }
                if (stringKeys.indexOf(name) === -1) {
                    throw new Error("Id is not valid key");
                }
                setValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
            }
        };
    }, [matching, setValues]);
    const handleCheck = React.useCallback((id) => {
        return (e) => {
            const { checked, id, name } = e.target;
            // when id
            if (id) {
                if (typeof id !== "string") {
                    throw new Error("Id is not string or undefined");
                }
                if (boolKeys.indexOf(id) === -1) {
                    throw new Error("Id is not valid key");
                }
                setValues((prev) => (Object.assign(Object.assign({}, prev), { [id]: checked })));
            }
            // when name
            else {
                if (typeof name !== "string") {
                    throw new Error("Name is not string or undefined");
                }
                if (boolKeys.indexOf(name) === -1) {
                    throw new Error("Name is not valid key");
                }
                setValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: checked })));
            }
        };
    }, [matching, setValues]);
    const handleNumber = React.useCallback((id) => {
        return (e) => {
            const { value, id, name } = e.target;
            // when id
            if (id) {
                if (typeof id !== "string") {
                    throw new Error("Id is not string or undefined");
                }
                if (numberKeys.indexOf(id) === -1) {
                    throw new Error("Id is not valid key");
                }
                // Check if the input is a valid number or empty string
                if (value === "" || /^\d+(\.\d+)?$/.test(value)) {
                    setValues((prev) => (Object.assign(Object.assign({}, prev), { [id]: value === "" ? "" : Number(value) })));
                }
            }
            // when name
            else {
                if (typeof name !== "string") {
                    throw new Error("Name is not string or undefined");
                }
                if (numberKeys.indexOf(name) === -1) {
                    throw new Error("Name is not valid key");
                }
                // Check if the input is a valid number or empty string
                if (value === "" || /^\d+(\.\d+)?$/.test(value)) {
                    setValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: value === "" ? "" : Number(value) })));
                }
            }
        };
    }, [matching, setValues]);
    const keys = {
        allKeys: [...strings, ...booleans, ...numbers],
        stringKeys,
        boolKeys,
        numberKeys,
    };
    const handlers = {
        handleString,
        handleCheck,
        handleNumber,
    };
    return {
        values,
        setValues,
        matching,
        handlers,
        keys,
    };
};
