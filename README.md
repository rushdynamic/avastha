# avastha

A minimal state management library for React.

# Usage

**Step 1.** Install the latest version of `avastha` using npm or yarn.

`npm i avastha`

**Step 2.** Use the `create` function from `avastha` to create a new custom hook with an initial state
Example:

```
const useCounterStore = create<CounterState>(setState => {
    return {
        count: 1,
        increment: () => setState((state) => ({ count: state.count + 1 })),
        decrement: () => setState((state) => ({ count: state.count - 1 })),
    }
})

export default useCounterStore
```

**Step 3.** Import and use the new custom hook in your required components
Example:

```
import useCounterStore from "./CounterStore"
......
const count = useCounterStore((state) => state.count);
```

That's it. Feel free to refer to the `examples` directory for more clarity.

<span style="color:red">**WARNING: This library was created for learning purposes, and is NOT production ready at this time.**</span>
