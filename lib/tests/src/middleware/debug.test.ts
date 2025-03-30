import { describe, it, expect, jest, beforeAll, afterAll, afterEach } from "@jest/globals";
import { log as debugLog } from "../../../src/middleware/debug";

describe("log", () => {
    beforeAll(() => {
        jest.spyOn(console, "debug").mockImplementation(() => {});
        jest.spyOn(console, "table").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("should log state changes with updated values", () => {
        const prevState = { a: 1, b: 2 };
        const nextState = { a: 1, b: 3 };
        const updated = { b: 3 };

        debugLog(nextState, prevState, updated);

        expect(console.debug).toHaveBeenCalledWith("[AVASTHA STATE CHANGES]:", updated);
        expect(console.table).toHaveBeenCalledWith({ prev: prevState, next: nextState });
    });

    it("should log state changes without updated values", () => {
        const prevState = { a: 1, b: 2 };
        const nextState = { a: 1, b: 3 };

        debugLog(nextState, prevState);

        expect(console.debug).toHaveBeenCalledWith("[AVASTHA STATE CHANGES]:", "");
        expect(console.table).toHaveBeenCalledWith({ prev: prevState, next: nextState });
    });

    it("should log next state even if previous state is undefined", () => {
        const nextState = { a: 1 };

        debugLog(nextState);

        expect(console.debug).toHaveBeenCalledWith("[AVASTHA STATE CHANGES]:", "");
        expect(console.table).toHaveBeenCalledWith({ prev: undefined, next: nextState });
    });
});
