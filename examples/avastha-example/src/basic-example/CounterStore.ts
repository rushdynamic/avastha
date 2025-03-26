import { create } from "avastha";

type CounterState = {
    count: number,
    increment: () => void,
    decrement: () => void,
}

const useCounterStore = create<CounterState>(setState => {
    return {
        count: 1,
        increment: () => setState((state) => ({ count: state.count + 1 })),
        decrement: () => setState((state) => ({ count: state.count - 1 })),
    }
})

export default useCounterStore