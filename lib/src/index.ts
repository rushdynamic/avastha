type Updater<State> = (state: State) => State;
type Initializer<State> = (setState: (updater: Updater<State>) => void) => State;
type Listener = () => void;

const create = <State>(initializer: Initializer<State>) => {

    let state: State;
    const listeners = new Set<Listener>();

    const setState = (updater: Updater<State>) => {
        const partiallyUpdatedState = updater(state);
        if (partiallyUpdatedState !== state) { // TODO: improve this comparison
            state = { ...state, ...partiallyUpdatedState };
            listeners.forEach((listener) => listener());
        }
    }

    const subscribe = (callback: () => void) => {
        listeners.add(callback);
        return () => listeners.delete(callback);
    }

    state = initializer(setState);
}