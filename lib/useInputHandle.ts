import * as React from "react";

import { KeyOf } from "./type";
import { createEmptyObj, createMatchingObj } from "./typeUtil";

export const useInputStrHandle = <U extends any, T extends string>(
  ...keys: T[]
) => {
  const keyArr = [...keys] as const;
  type InputKeysType = KeyOf<typeof keyArr>;

  // state props
  const [values, setValues] = React.useState<Partial<Record<InputKeysType, U>>>(
    createEmptyObj()
  );

  const valueKeys = React.useMemo(
    () => Object.freeze(createMatchingObj<InputKeysType>(...keyArr)),
    []
  );

  const handleInput = React.useCallback(
    (isId?: boolean) => {
      return (e: React.ChangeEvent<HTMLInputElement | HTMLButtonElement>) => {
        const { value, id, name } = e.target;

        // when id
        if (isId) {
          if (typeof id !== "string") return;

          // check whether id is InputKeysType type
          const key = valueKeys[id as InputKeysType];
          if (!key) return;

          setValues((prev) => ({
            ...prev,
            [key]: value,
          }));
        }

        // when name
        else {
          if (typeof id !== "string") return;
          const key = valueKeys[name as InputKeysType];
          if (!key) return;

          setValues((prev) => ({
            ...prev,
            [key]: value,
          }));
        }
      };
    },
    [valueKeys, setValues]
  );

  const handleCheck = React.useCallback(
    (isId?: boolean) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, id, name } = e.target;

        // when id
        if (isId) {
          if (typeof id !== "string") return;

          // check whether id is InputKeysType type
          const key = valueKeys[id as InputKeysType];
          if (!key) return;

          setValues((prev) => ({
            ...prev,
            [key]: checked,
          }));
        }

        // when name
        else {
          if (typeof id !== "string") return;
          const key = valueKeys[name as InputKeysType];
          if (!key) return;

          setValues((prev) => ({
            ...prev,
            [key]: checked,
          }));
        }
      };
    },
    [valueKeys, setValues]
  );

  return { values, setValues, handleInput, handleCheck, valueKeys };
};
