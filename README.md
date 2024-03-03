`@kkoms/react-simple-input` is a typescript library for easily implementing input handlers.

It's declarative and intended to be simple and type-safe when using typescript in react.

Only available on React `18.0.0` or higher

## Installation

```shell
yarn add @kkoms/react-simple-input
# or
npm install @kkoms/react-simple-input --save
# or
pnpm add @kkoms/react-simple-input
```

## example usage

```typescript
import useInputHandle from "./dist";

function Example() {
  const { values, setValues, handlers, matching, checks, keys } =
    useInputHandle({
      // use strings, booleans, numbers to set type of input value. keys can be omitted.
      strings: ["email", "password"],
      booleans: ["checked"],
      numbers: ["age"],
      // [optional] you can set default value if you want bind value to input element.
      // If you do not give defaults, string - '', boolean - flase, number - 0.
      defaults: {
        string: "",
        // boolean: false,
        // number: 0,
      },
    });

  // stringKeys - ["email", "password"]
  // boolKeys - ["checked"]
  // numberKeys - ["age"]
  const { stringKeys, boolKeys, numberKeys } = keys;

  // put these at 'onChange' or 'onChecked'.
  // give true if you want to use id.
  const { handleString, handleCheck, handleNumber } = handlers;

  // making your own custom handler
  const customHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === matching.email) {
      console.log("email changed");

      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });

      return;
    }

    if (checks.isStrKey(e.target.name)) {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  console.log(values.email);
  console.log(values.password);
  console.log(values.checked);
  console.log(values.age);

  return (
    <div style={{ backgroundColor: "red" }}>
      <input
        id={matching.password}
        onChange={handlers.handleString(true)}
        value={values.password}
      />
      <input
        name={matching.password}
        onChange={handlers.handleString()}
        value={values.password}
      />
      <input
        name={matching.email}
        onChange={handlers.handleString()}
        value={values.email}
      />
      <input
        type="checkbox"
        name={matching.checked}
        onChange={handlers.handleCheck()}
      />
      <input
        type="number"
        name={matching.age}
        onChange={handlers.handleNumber()}
      />
    </div>
  );
}

export default Example;

```
