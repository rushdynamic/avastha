import { useSyncExternalStore } from "react";
import { Initializer, Listener, Selector, SetState } from "./types";

const create = <State>(initializer: Initializer<State>) => {

    let state: State;
    const listeners = new Set<Listener>();

    const setState: SetState<State> = (updater) => {
        const partiallyUpdatedState = updater(state);
        if (partiallyUpdatedState !== state) { // TODO: improve this comparison
            state = { ...state, ...partiallyUpdatedState };
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

export default create;