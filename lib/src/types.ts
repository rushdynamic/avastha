type Updater<State> = (state: State) => State;
export type Selector<State, Result> = (state: State) => Result;
export type Listener = () => void;
export type SetState<State> = (updater: Updater<State>) => void;
export type Initializer<State> = (setState: SetState<State>) => State;
