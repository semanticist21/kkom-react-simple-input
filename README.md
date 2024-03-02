`@kkomjang/react-simple-input` is a typescript library for easily implementing input handlers.

It's declarative and intende to be simple and type-safe when using typescript in react.

Only available on React `18.0.0` or higher

## Installation

```shell
yarn add @kkomjang/react-simple-input
# or
npm install @kkomjang/react-simple-input --save
# or
pnpm add @kkomjang/react-simple-input
```

## example usage

```ts
import useInputHandle from "../react-simple-input";

export const Example = () => {
  // declaration
  const { values, setValues, matching, handlers, keys } = useInputHandle({
    strings: ["name", "password"],
    booleans: ["isAgreed"],
    numbers: ["views"],
  });

  // handleString - function to handle string input change
  // handleCheck - function to handle checkbox input change
  // handleNumber - function to handle number input change
  const { handleString, handleCheck, handleNumber } = handlers;

  // stringKeys - ["name", "email"]
  // boolKeys - ["isAgreed"]
  // numberKeys - ["views"]
  const { stringKeys, boolKeys, numberKeys } = keys;

  console.log(values.name);
  console.log(values.password);
  console.log(values.isAgreed);
  console.log(values.views);

  return (
    <div>
      <input id={matching.name} onChange={handleString(true)} />
      <input name={matching.password} onChange={handleString()} />
      <input
        type="checkbox"
        name={matching.isAgreed}
        onChange={handleCheck()}
      />
      <input type="number" name={matching.views} onChange={handleNumber()} />
    </div>
  );
};



```
