const deepEqual = <State>(a: State | Partial<State>, b: State | Partial<State>): boolean => {
    // If they are the same reference, return true
    if (Object.is(a, b)) return true;

    // If one is null/undefined and the other isn’t, return false
    if (
        (a === null || a === undefined || typeof a !== "object") !==
        (b === null || b === undefined || typeof b !== "object")
    ) {
        return false;
    }

    // If both are primitives, compare directly
    if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
        return a === b;
    }

    // Both are objects, get their keys
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    // If a has more keys than b, check if b is a submap of a
    if (keysA.length > keysB.length) {
        return keysB.every((k) => k in a && deepEqual(a[k as keyof State], b[k as keyof State]));
    }

    // If b has more keys or equal keys, check if a is a submap of b
    return keysA.every((k) => k in b && deepEqual(a[k as keyof State], b[k as keyof State]));
}

export { deepEqual };