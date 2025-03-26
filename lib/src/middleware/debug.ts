const log = <State>(prev: State, next: State, updated: Partial<State>) => {
    console.debug("[AVASTHA STATE CHANGES]:", updated);
    console.table({
        prev: prev, next: next
    });
}

export { log };