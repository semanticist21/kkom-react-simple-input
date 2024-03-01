import * as React from "react";

import { KeyOf } from "./type";
import { createEmptyObj, createMatchingObj } from "./typeUtil";

interface UseInputType<
  T extends readonly string[],
  E extends readonly string[],
  U extends readonly string[]
> {
  /**
   * values - state values containing input keys
   */
  values: { [key in T[number]]: string } & { [key in E[number]]: boolean } & {
    [key in U[number]]: number;
  };

  /**
   * setValues - state setter for values
   */
  setValues: React.Dispatch<
    React.SetStateAction<
      { [K in T[number]]: K } & { [K in E[number]]: K } & {
        [K in U[number]]: K;
      }
    >
  >;

  /**
   * matching - object containing input keys, use it for giving id or name to input elements
   */
  matching: Readonly<
    {
      [K in T[number]]: K;
    } & { [K in E[number]]: K } & {
      [K in U[number]]: K;
    }
  >;

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
export const useInputHandle = <
  T extends string,
  E extends string,
  U extends string
>({
  strings = [],
  booleans = [],
  numbers = [],
}: HandleProps<T, E, U>): UseInputType<T[], E[], U[]> => {
  const stringKeys = [...strings] as const;
  const boolKeys = [...booleans] as const;
  const numberKeys = [...numbers] as const;

  type StrKeyType = KeyOf<typeof stringKeys>;
  type BoolKeyType = KeyOf<typeof boolKeys>;
  type NumKeyType = KeyOf<typeof numberKeys>;

  const [values, setValues] = React.useState<
    { [key in StrKeyType]: string } & { [key in BoolKeyType]: boolean } & {
      [key in NumKeyType]: number;
    }
  >(
    Object.assign(
      createEmptyObj<StrKeyType, string>(),
      createEmptyObj<BoolKeyType, boolean>(),
      createEmptyObj<NumKeyType, number>()
    )
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

  const handleString = React.useCallback(
    (id?: boolean) => {
      return (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement
        >
      ) => {
        const { value, id, name } = e.target;

        // when id
        if (id) {
          if (typeof id !== "string") {
            throw new Error("Id is not string or undefined");
          }

          if (stringKeys.indexOf(id as StrKeyType) === -1) {
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
            throw new Error("Id is not string or undefined");
          }

          if (stringKeys.indexOf(name as StrKeyType) === -1) {
            throw new Error("Id is not valid key");
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
    (id?: boolean) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, id, name } = e.target;

        // when id
        if (id) {
          if (typeof id !== "string") {
            throw new Error("Id is not string or undefined");
          }

          if (boolKeys.indexOf(id as BoolKeyType) === -1) {
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

          if (boolKeys.indexOf(name as BoolKeyType) === -1) {
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
    (id?: boolean) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id, name } = e.target;

        // when id
        if (id) {
          if (typeof id !== "string") {
            throw new Error("Id is not string or undefined");
          }

          if (numberKeys.indexOf(id as NumKeyType) === -1) {
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

          if (numberKeys.indexOf(name as NumKeyType) === -1) {
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

  return {
    values,
    setValues,
    matching,
    handlers,
    keys,
  };
};
