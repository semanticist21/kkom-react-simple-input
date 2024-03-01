export const toReadOnly = (...args) => {
    return [...args];
};
export const createEmptyObj = () => {
    const obj = {};
    return obj;
};
export const createMatchingObj = (...args) => {
    const obj = {};
    args.forEach((arg) => {
        obj[arg] = arg;
    });
    return obj;
};
