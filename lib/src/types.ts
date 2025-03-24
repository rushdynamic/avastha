export type Updater<State> = (state: State) => State;
export type Initializer<State> = (setState: (updater: Updater<State>) => void) => State;
export type Selector<State> = (state: State) => State;
export type Listener = () => void;