import { useSyncExternalStore, useRef } from "react";
import {
    Initializer,
    Listener,
    StateSelector,
    ActionSelector,
    SetState,
    UpdateState,
    ExtractState,
    DebugFn
} from "./types";
import getProxyWithStatus from "./proxy";
import * as compareUtils from "./utils/compare";

const createStore = <Store extends { state: any; actions: any }>(
    initializer: Initializer<Store>,
    debugFn?: DebugFn<ExtractState<Store>>
) => {
    let store: Store;
    const listeners = new Set<Listener>();

    // Immutable state updation
    const setState: SetState<ExtractState<Store>> = (action) => {
        const partiallyUpdatedState = action(store.state);
        // shallow comparison is enough here because immutable actions
        // always return a new object
        if (partiallyUpdatedState !== store.state) {
            const updatedState = { ...store.state, ...partiallyUpdatedState };
            if (debugFn) {
                debugFn(updatedState, store.state, partiallyUpdatedState);
            }
            store.state = updatedState;
            listeners.forEach((listener) => listener());
        }
    };

    // Mutable state updation
    const updateState: UpdateState<ExtractState<Store>> = (action) => {
        const { proxyState, changed } = getProxyWithStatus(store.state);
        action(proxyState);
        if (changed.status) {
            if (debugFn) {
                // We lose the prev and updated state details with immutable updates
                debugFn(store.state);
            }
            listeners.forEach((listener) => listener());
        }
    };

    const subscribe = (callback: () => void) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
    };

    store = initializer(setState, updateState);

    const useState = <Result>(selector: StateSelector<Store, Result>): Result => {
        const prevSelectionRef = useRef<Result>(selector(store.state));
        return useSyncExternalStore(subscribe, () => {
            const newSelection = selector(store.state);
            // TODO: figure out if deep comparison is required here or not
            // What if the user is trying to select a deeply nested map? Won't shallow comparison always return false?
            // TODO: check out performance hit with doing deep comparison
            if (compareUtils.deepEqual(newSelection, prevSelectionRef.current)) {
                return prevSelectionRef.current;
            }
            prevSelectionRef.current = newSelection;
            return newSelection;
        });
    };

    const useAction = <Result>(selector: ActionSelector<Store, Result>): Result => {
        return selector(store.actions);
    };

    return { useState, useAction };
};

export { createStore as create };
export * as debug from "./middleware/debug";
