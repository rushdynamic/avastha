import { describe, it, expect } from "@jest/globals";
import { deepEqual } from "../../../src/utils/compare";

describe("deepEqual", () => {
    it("should return true for identical primitives", () => {
        expect(deepEqual(42, 42)).toBe(true);
        expect(deepEqual("hello", "hello")).toBe(true);
        expect(deepEqual(true, true)).toBe(true);
        expect(deepEqual(null, null)).toBe(true);
        expect(deepEqual(undefined, undefined)).toBe(true);
    });

    it("should return false for different primitives", () => {
        expect(deepEqual(42, 43)).toBe(false);
        expect(deepEqual("hello", "world")).toBe(false);
        expect(deepEqual(true, false)).toBe(false);
        expect(deepEqual(null, undefined)).toBe(false);
    });

    it("should return true for identical objects", () => {
        const obj1 = { a: 1, b: "text", c: true };
        const obj2 = { a: 1, b: "text", c: true };
        expect(deepEqual(obj1, obj2)).toBe(true);
    });

    it("should return false for different objects", () => {
        const obj1 = { a: 1, b: "text", c: true };
        const obj2 = { a: 1, b: "different", c: true };
        expect(deepEqual(obj1, obj2)).toBe(false);
    });

    it("should return false for submap comparison", () => {
        const obj1 = { a: 1, b: "text", c: true };
        const obj2 = { a: 1, b: "text" };
        expect(deepEqual(obj1, obj2)).toBe(false);
        expect(deepEqual(obj2, obj1)).toBe(false);
    });

    it("should return false if one object has extra keys that are different", () => {
        const obj1 = { a: 1, b: "text" };
        const obj2 = { a: 1, b: "text", c: 21 };
        expect(deepEqual(obj1, obj2)).toBe(false);
        expect(deepEqual(obj2, obj1)).toBe(false);

        const obj3 = { a: 1, b: "text", c: 42 };
        expect(deepEqual(obj2, obj3)).toBe(false);
    });

    it("should handle nested objects correctly", () => {
        const obj1 = { a: { b: { c: 42 } } };
        const obj2 = { a: { b: { c: 42 } } };
        expect(deepEqual(obj1, obj2)).toBe(true);

        const obj3 = { a: { b: { c: 43 } } };
        expect(deepEqual(obj1, obj3)).toBe(false);
    });

    it("should handle arrays correctly", () => {
        expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it("should handle mixed types", () => {
        expect(deepEqual({ a: 1 }, ["a", 1])).toBe(false);
        expect(deepEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 })).toBe(true);
        expect(deepEqual([1, 2, 3], { a: 1, b: 2, c: 3 })).toBe(false);
        expect(deepEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3, 3: 4 })).toBe(false);
    });
});
