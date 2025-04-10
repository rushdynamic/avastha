import { describe, it, expect } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { create } from "../../src/store";

describe("createStore", () => {
    it("should initialize store with given state", () => {
        type CounterState = { state: { count: number } };
        const counterStore = create<CounterState>((_setState, _updateState) => ({
            state: { count: 1 }
        }));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));
        expect(result.current).toBe(1);
    });

    it("should update state immutably", () => {
        type CounterState = {
            state: {
                count: number;
            };
            actions: {
                increment: () => void;
            };
        };

        const counterStore = create<CounterState>((setState, _updateState) => ({
            state: { count: 2 },
            actions: {
                increment: () => setState((state) => ({ ...state, count: state.count + 1 }))
            }
        }));

        const {
            result: { current: increment }
        } = renderHook(() => counterStore.useAction((actions) => actions.increment));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));

        act(() => {
            increment();
        });

        expect(result.current).toBe(3);
    });

    it("should update state mutably", () => {
        type CounterState = {
            state: {
                count: number;
            };
            actions: {
                incrementMutable: () => void;
            };
        };

        const counterStore = create<CounterState>((_setState, updateState) => ({
            state: { count: 5 },
            actions: {
                incrementMutable: () =>
                    updateState((state) => {
                        state.count += 1;
                    })
            }
        }));

        const {
            result: { current: incrementMutable }
        } = renderHook(() => counterStore.useAction((actions) => actions.incrementMutable));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));

        act(() => {
            incrementMutable();
        });

        expect(result.current).toBe(6);
    });

    it("should return transformed state during immutable update", () => {
        type CounterState = {
            state: {
                count: number;
            };
            actions: {
                increment: () => void;
            };
            transforms: {
                count: (count: number) => number;
            };
        };

        const counterStore = create<CounterState>((setState, _updateState) => ({
            state: { count: 2 },
            actions: {
                increment: () => setState((state) => ({ ...state, count: state.count + 1 }))
            },
            transforms: {
                count: (count) => count * 5
            }
        }));

        const {
            result: { current: increment }
        } = renderHook(() => counterStore.useAction((actions) => actions.increment));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));

        act(() => {
            increment();
        });

        expect(result.current).toBe(15);
    });

    it("should return transformed state during mutable update", () => {
        type CounterState = {
            state: {
                count: number;
            };
            actions: {
                incrementMutable: () => void;
            };
            transforms: {
                count: (count: number) => number;
            };
        };

        const counterStore = create<CounterState>((_setState, updateState) => ({
            state: { count: 2 },
            actions: {
                incrementMutable: () =>
                    updateState((state) => {
                        state.count += 1;
                    })
            },
            transforms: {
                count: (count) => count * 5
            }
        }));

        const {
            result: { current: incrementMutable }
        } = renderHook(() => counterStore.useAction((actions) => actions.incrementMutable));
        const { result } = renderHook(() => counterStore.useState((state) => state.count));

        act(() => {
            incrementMutable();
        });

        expect(result.current).toBe(15);
    });
});
