// @ts-nocheck

import create from "sqrrl";

const useCounterStore = create(set => {
    return {
        count: 1,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
    }
})

export default useCounterStore