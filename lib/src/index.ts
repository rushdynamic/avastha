import { useSyncExternalStore, useRef } from "react";
import { Initializer, Listener, Selector, SetState, UpdateState, DebugFn } from "./types";
import * as compareUtils from "./utils/compare";

const createStore = <State>(initializer: Initializer<State>, debugFn?: DebugFn<State>) => {

    let state: State;
    const listeners = new Set<Listener>();

    // Immutable state updation
    const setState: SetState<State> = (action) => {
        const partiallyUpdatedState = action(state);
        if (!compareUtils.deepEqual<State>(partiallyUpdatedState, state)) {
            const updatedState = { ...state, ...partiallyUpdatedState };
            if (debugFn) {
                debugFn(updatedState, state, partiallyUpdatedState);
            }
            state = updatedState;
            listeners.forEach((listener) => listener());
        }
    }

    // Mutable state updation
    const updateState: UpdateState<State> = (action) => {
        let changed = false;
        const proxyState = new Proxy(state as object, {
            set(target: any, prop: string, value: any) {
                if (target[prop] !== value) {
                    changed = true;
                }
                target[prop] = value;
                return true;
            }
        })
        action(proxyState);
        if (changed) {
            if (debugFn) {
                // We lose the prev and updated state details with immutable updates
                debugFn(state);
            }
            listeners.forEach((listener) => listener());
        }
    }

    const subscribe = (callback: () => void) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
    }

    state = initializer(setState, updateState);

    const useStore = <Result>(selector: Selector<State, Result>): Result => {
        const prevSelectionRef = useRef<Result>(selector(state));
        return useSyncExternalStore(
            subscribe,
            () => {
                const newSelection = selector(state);
                // TODO: figure out if deep comparison is required here or not
                // What if the user is trying to select a deeply nested map? Won't shallow comparison always return false?
                // TODO: check out performance hit with doing deep comparison
                if (compareUtils.deepEqual(newSelection, prevSelectionRef.current)) {
                    return prevSelectionRef.current;
                }
                prevSelectionRef.current = newSelection;
                return newSelection;
            }
        )
    }

    return useStore;
}

export { createStore as create };
export * as debug from "./middleware/debug"