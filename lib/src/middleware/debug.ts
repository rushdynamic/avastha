const log = <State>(next: State, prev?: State, updated?: Partial<State>) => {
    console.debug("[AVASTHA STATE CHANGES]:", updated);
    console.table({
        prev: prev, next: next
    });
}

export { log };