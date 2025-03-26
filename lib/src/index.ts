import { useSyncExternalStore } from "react";
import { Initializer, Listener, Selector, SetState, DebugFn } from "./types";
import * as compareUtils from "./utils/compare";

const createStore = <State>(initializer: Initializer<State>, debugFn?: DebugFn<State>) => {

    let state: State;
    const listeners = new Set<Listener>();

    const setState: SetState<State> = (updater) => {
        const partiallyUpdatedState = updater(state);
        if (!compareUtils.deepEqual<State>(partiallyUpdatedState, state)) {
            const updatedState = { ...state, ...partiallyUpdatedState };
            if (debugFn) {
                debugFn(updatedState, state, partiallyUpdatedState);
            }
            state = updatedState;
            listeners.forEach((listener) => listener());
        }
    }

    const subscribe = (callback: () => void) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
    }

    state = initializer(setState);

    const useStore = <Result>(selector: Selector<State, Result>): Result => {
        return useSyncExternalStore(
            subscribe,
            () => selector(state)
        )
    }

    return useStore;
}

export { createStore as create };
export * as debug from "./middleware/debug"