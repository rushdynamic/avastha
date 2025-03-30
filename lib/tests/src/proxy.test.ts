import { describe, it, expect } from "@jest/globals";
import getProxyWithStatus from "../../src/proxy";

describe("getProxyWithStatus", () => {
    it("detects a change when a property is modified", () => {
        const state = { count: 0 };
        const { proxyState, changed } = getProxyWithStatus(state);

        expect(changed.status).toBe(false);
        proxyState.count = 1;
        expect(changed.status).toBe(true);
    });

    it("does not mark changed if property is set to the same value", () => {
        const state = { count: 0 };
        const { proxyState, changed } = getProxyWithStatus(state);

        proxyState.count = 0; // No actual change
        expect(changed.status).toBe(false);
    });

    it("detects changes in nested objects", () => {
        const state = { user: { name: "Alice" } };
        const { proxyState, changed } = getProxyWithStatus(state);

        expect(changed.status).toBe(false);
        proxyState.user.name = "Bob"; // Nested change
        expect(changed.status).toBe(true);
    });

    it("does not change status if a nested value is set to the same value", () => {
        const state = { user: { name: "Alice" } };
        const { proxyState, changed } = getProxyWithStatus(state);

        proxyState.user.name = "Alice"; // No actual change
        expect(changed.status).toBe(false);
    });

    it("creates a proxy that behaves like the original object", () => {
        const state = { a: 1, b: { c: 2 } };
        const { proxyState } = getProxyWithStatus(state);

        expect(proxyState.a).toBe(1);
        expect(proxyState.b.c).toBe(2);
    });

    it("works with arrays", () => {
        const state = { list: [1, 2, 3] };
        const { proxyState, changed } = getProxyWithStatus(state);

        expect(changed.status).toBe(false);
        proxyState.list[1] = 99;
        expect(changed.status).toBe(true);
    });

    it("works with deeply nested objects", () => {
        const state = { a: { b: { c: { d: 1 } } } };
        const { proxyState, changed } = getProxyWithStatus(state);

        expect(changed.status).toBe(false);
        proxyState.a.b.c.d = 2; // Deeply nested change
        expect(changed.status).toBe(true);
    });

    it("returns a fresh proxy each time", () => {
        const state = { value: 1 };
        const { proxyState: proxy1 } = getProxyWithStatus(state);
        const { proxyState: proxy2 } = getProxyWithStatus(state);

        expect(proxy1).not.toBe(proxy2);
    });
});
