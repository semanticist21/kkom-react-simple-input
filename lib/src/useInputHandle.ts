import * as React from "react";

import { CombineIfNotNever, KeyOf } from "./type";
import { createEmptyObj, createMatchingObj } from "./typeUtil";

interface UseInputType<
  T extends string | never,
  E extends string | never,
  U extends string | never
> {
  /**
   * values - state values containing input keys
   */
  values: CombineIfNotNever<
    [T] extends [never] ? never : { [K in T]: string },
    [E] extends [never] ? never : { [K in E]: boolean },
    [U] extends [never] ? never : { [K in U]: number }
  >;

  /**
   * setValues - state setter for values
   */
  setValues: React.Dispatch<
    React.SetStateAction<
      CombineIfNotNever<
        [T] extends [never] ? never : { [K in T]: string },
        [E] extends [never] ? never : { [K in E]: boolean },
        [U] extends [never] ? never : { [K in U]: number }
      >
    >
  >;

  /**
   * matching - object containing input keys, use it for giving id or name to input elements
   */
  matching: Readonly<{ [K in T]: K } & { [K in E]: K } & { [K in U]: K }>;

  /**
   * handlers - simple input change handlers
   */
  handlers: {
    handleString: (
      id?: boolean
    ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheck: (
      id?: boolean
    ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNumber: (
      id?: boolean
    ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  /**
   * keys - readonly array containing input keys
   */
  keys: {
    readonly allKeys: readonly (T | E | U)[];
    readonly stringKeys: readonly T[];
    readonly boolKeys: readonly E[];
    readonly numberKeys: readonly U[];
  };
  /**
   * checks - type checkers for input keys
   */
  checks: {
    isStrKey: (key: string) => key is T[number];
    isBoolKey: (key: string) => key is E[number];
    isNumKey: (key: string) => key is U[number];
  };
}
interface HandleProps<T extends string, E extends string, U extends string> {
  strings?: T[];
  booleans?: E[];
  numbers?: U[];
  defaults?: {
    string?: string;
    boolean?: boolean;
    number?: number;
  };
}

/**
 * @description useInputHandle
 * @param keys input keys
 * @returns {Object} containing values, setValues, handlers, matching, keys, checks
 */
export const useInputHandle = <
  T extends string = never,
  E extends string = never,
  U extends string = never
>({
  strings = [],
  booleans = [],
  numbers = [],
  defaults,
}: HandleProps<T, E, U>): UseInputType<T, E, U> => {
  const stringKeys = [...strings] as const;
  const boolKeys = [...booleans] as const;
  const numberKeys = [...numbers] as const;

  type StrKeyType = KeyOf<typeof stringKeys>;
  type BoolKeyType = KeyOf<typeof boolKeys>;
  type NumKeyType = KeyOf<typeof numberKeys>;

  const [values, setValues] = React.useState<
    CombineIfNotNever<
      [T] extends [never] ? never : { [K in StrKeyType]: string },
      [E] extends [never] ? never : { [K in BoolKeyType]: boolean },
      [U] extends [never] ? never : { [K in NumKeyType]: number }
    >
  >(
    Object.freeze(
      Object.assign(
        createEmptyObj<StrKeyType, string>(
          defaults?.string ?? "",
          ...stringKeys
        ),
        createEmptyObj<BoolKeyType, boolean>(
          defaults?.boolean ?? false,
          ...boolKeys
        ),
        createEmptyObj<NumKeyType, number>(defaults?.number ?? 0, ...numberKeys)
      )
    ) as any
  );

  const matching = React.useMemo(() => {
    return Object.freeze(
      Object.assign(
        createMatchingObj<StrKeyType>(...strings),
        createMatchingObj<BoolKeyType>(...booleans),
        createMatchingObj<NumKeyType>(...numbers)
      )
    );
  }, []);

  // type checkers
  const isStrKey = (key: string): key is StrKeyType => {
    return stringKeys.indexOf(key as StrKeyType) !== -1;
  };

  const isBoolKey = (key: string): key is BoolKeyType => {
    return boolKeys.indexOf(key as BoolKeyType) !== -1;
  };

  const isNumKey = (key: string): key is NumKeyType => {
    return numberKeys.indexOf(key as NumKeyType) !== -1;
  };

  // handlers
  const handleString = React.useCallback(
    (isId?: boolean) => {
      return (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement
        >
      ) => {
        const { value, id, name } = e.target;

        // when id
        if (isId) {
          if (typeof id !== "string") {
            throw new Error("Id is not string or undefined");
          }

          if (!isStrKey(id)) {
            throw new Error("Id is not valid key");
          }

          setValues((prev) => ({
            ...prev,
            [id]: value,
          }));
        }

        // when name
        else {
          if (typeof name !== "string") {
            throw new Error("Name is not string or undefined");
          }

          if (!isStrKey(name)) {
            throw new Error("Name is not valid key");
          }

          setValues((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
    },
    [matching, setValues]
  );

  const handleCheck = React.useCallback(
    (isId?: boolean) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, id, name } = e.target;

        // when id
        if (isId) {
          if (typeof id !== "string") {
            throw new Error("Id is not string or undefined");
          }

          if (!isBoolKey(id)) {
            throw new Error("Id is not valid key");
          }

          setValues((prev) => ({
            ...prev,
            [id]: checked,
          }));
        }

        // when name
        else {
          if (typeof name !== "string") {
            throw new Error("Name is not string or undefined");
          }

          if (!isBoolKey(name)) {
            throw new Error("Name is not valid key");
          }

          setValues((prev) => ({
            ...prev,
            [name]: checked,
          }));
        }
      };
    },
    [matching, setValues]
  );

  const handleNumber = React.useCallback(
    (isId?: boolean) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id, name } = e.target;

        // when id
        if (isId) {
          if (typeof id !== "string") {
            throw new Error("Id is not string or undefined");
          }

          if (!isNumKey(id)) {
            throw new Error("Id is not valid key");
          }

          // Check if the input is a valid number or empty string
          if (value === "" || /^\d+(\.\d+)?$/.test(value)) {
            setValues((prev) => ({
              ...prev,
              [id]: value === "" ? "" : Number(value),
            }));
          }
        }

        // when name
        else {
          if (typeof name !== "string") {
            throw new Error("Name is not string or undefined");
          }

          if (!isNumKey(name)) {
            throw new Error("Name is not valid key");
          }

          // Check if the input is a valid number or empty string
          if (value === "" || /^\d+(\.\d+)?$/.test(value)) {
            setValues((prev) => ({
              ...prev,
              [name]: value === "" ? "" : Number(value),
            }));
          }
        }
      };
    },
    [matching, setValues]
  );

  const keys = {
    allKeys: [...strings, ...booleans, ...numbers] as const,
    stringKeys,
    boolKeys,
    numberKeys,
  } as const;

  const handlers = {
    handleString,
    handleCheck,
    handleNumber,
  } as const;

  const checks = {
    isStrKey,
    isBoolKey,
    isNumKey,
  } as const;

  return {
    values,
    setValues,
    matching,
    checks,
    handlers,
    keys,
  };
};
