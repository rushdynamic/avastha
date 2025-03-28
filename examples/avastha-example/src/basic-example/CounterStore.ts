import { create, debug } from "avastha";

type CounterState = {
    count: number,
    increment: () => void,
    incrementMutable: () => void,
    decrement: () => void,
}

const useCounterStore = create<CounterState>((setState, updateState) => {
    return {
        count: 1,
        increment: () => setState((state) => ({ count: state.count + 1 })),
        incrementMutable: () => updateState((state) => { state.count += 1; }),
        decrement: () => setState((state) => ({ count: state.count - 1 })),
    }
}, debug.log)

export default useCounterStore