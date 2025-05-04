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

const createStore = <Store extends { state: any; actions?: any; transforms?: any }>(
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
                // We lose the prev and updated state details with mutable updates
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

    const transform = <Result>(selector: StateSelector<Store, Result>, store: Store) => {
        const state = store.state;
        const slice = selector(state);
        const transforms = store.transforms;
        if (transforms === undefined) return slice;

        const proxy = new Proxy(state, {
            get(target, prop: keyof typeof state) {
                const original = target[prop];
                const transformer = transforms[prop];
                if (typeof transformer === "function" && original !== null) {
                    const transformed = transformer(original);

                    // only merge if transformed is an object
                    if (typeof transformed === "object" && transformed !== null) {
                        return { ...original, ...transformed };
                    }
                    // return transformed value directly without merging if not an object
                    else if (transformed !== null && typeof transformed !== "object") {
                        return transformed;
                    }
                }
                // if no transformer was found, return the original selected value
                return original;
            }
        });
        return selector(proxy);
    };

    const useState = <Result>(selector: StateSelector<Store, Result>): Result => {
        const prevSelectionRef = useRef<Result>(transform(selector, store));
        return useSyncExternalStore(subscribe, () => {
            const newSelection = transform(selector, store);
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
