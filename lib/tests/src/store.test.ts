import { describe, it, expect, jest } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { create } from "../../src/store";
import { Store } from "../../src/types";

describe("createStore", () => {
    it("should initialize store with given state", () => {
        type CounterState = { count: number };
        const useStore = create<CounterState>((_setState, _updateState) => ({ count: 1 }));
        const { result } = renderHook(() => useStore(state => state.count));
        expect(result.current).toBe(1);
    });

    it("should update state immutably", () => {
        type CounterState = {
            count: number,
            increment: () => void
        };

        const useStore = create<CounterState>((setState, _updateState) => ({
            count: 2,
            increment: () => setState((state) => ({ ...state, count: state.count + 1 }))
        }));

        const { result: { current: increment } } = renderHook(() => useStore(state => state.increment));
        const { result } = renderHook(() => useStore(state => state.count));

        act(() => {
            increment();
        });

        expect(result.current).toBe(3);
    });


    it("should update state mutably", () => {
        type CounterState = {
            count: number,
            incrementMutable: () => void
        };

        const useStore = create<CounterState>((_setState, updateState) => ({
            count: 5,
            incrementMutable: () => updateState((state) => { state.count += 1 })
        }));

        const { result: { current: incrementMutable } } = renderHook(() => useStore(state => state.incrementMutable));
        const { result } = renderHook(() => useStore(state => state.count));

        act(() => {
            incrementMutable();
        });

        expect(result.current).toBe(6);
    });
});