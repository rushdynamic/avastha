<div align='center'>
<h1>Avastha</h1>
Avastha is a minimal and flexible state management library for React, with support for both immutable and mutable state updates.
</div>
<br/>
<p align='right'>
<img src='https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' height=24 width=24 alt='typescript logo'/>
<img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' height=24 width=24 alt='react logo'/>
</p>

---

## ✨ Features
🍃 Lightweight and dependency-free

🔀 Supports both immutable `(setState)` and mutable `(updateState)` updates

🔍 Supports custom `selectors`, `actions`, and `transformers`

🧪 Built with TypeScript in mind, providing robust type safety and inference

⚡️ React 18+ concurrent rendering safe

## 📦 Installation
```
npm install avastha
# or
yarn add avastha
```
## 🛠️ Usage
### 1. Basic Counter Example
```
import { create } from "avastha";

const counterStore = create(({ setState }) => ({
  state: { count: 0 },
  actions: {
    increment: () => setState((s) => ({ count: s.count + 1 })),
    decrement: () => setState((s) => ({ count: s.count - 1 })),
  },
}));

function Counter() {
  const count = counterStore.useState((s) => s.count);
  const increment = counterStore.useAction((a) => a.increment);
  const decrement = counterStore.useAction((a) => a.decrement);

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}
```

### 2. Mutable State Example
```
const fruitStore = create(({ updateState }) => ({
  state: { fruits: [] },
  actions: {
    addFruit: (name) => updateState((s) => s.fruits.push(name)),
  },
}));
```
### 3. Transforms Support
If your store has a transforms object, Avastha will check if your selector returns a transformer function and apply it to the selection.

```
const userStore = create(({ setState }) => ({
  state: { firstName: "Ada", lastName: "Lovelace" },
  transforms: {
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
}));

const fullName = userStore.useState((s) => s.fullName); // "Ada Lovelace"
```

## 🧩 API
`create(initializer, debugFn?)`
Returns an object with useState and useAction.

`useState(selector)`
Subscribes to a derived slice of state using a selector function.

`useAction(selector)`
Accesses a specific action via a selector function.

## 🪵 Debugging
Pass a debugFn to `create` to observe state changes:
```
const debugFn = (next, prev, updated) => {
  console.log("State changed:", { prev, updated, next });
};
const store = create(initializer, debugFn);
```

## 🧪 Example Projects
You can explore more usage examples in the `examples/avastha-example` directory:
- Basic counter
- Nested state
- Nested state with Transforms
- Multiple slices

## 📝 License
[MIT](https://github.com/rushdynamic/avastha/blob/main/LICENSE.md)
