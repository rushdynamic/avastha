const deepEqual = <State>(a: State | Partial<State>, b: State | Partial<State>): boolean => {
    // If they are the same reference, return true
    if (Object.is(a, b)) return true;

    // If they are not of the same type, return false
    if (typeof a !== typeof b) {
        return false;
    }

    // If one is null/undefined and the other isn’t, return false
    if ((a === null || a === undefined) !== (b === null || b === undefined)) {
        return false;
    }

    // If both are primitives, compare directly
    if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
        return a === b;
    }

    // Both are objects, get their keys
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    // Sub-maps are not valid
    if (keysA.length !== keysB.length) {
        return false;
    }

    // Recursively compare only if they have equal number of keys
    return keysA.every((k) => k in b && deepEqual(a[k as keyof State], b[k as keyof State]));
};

export { deepEqual };
