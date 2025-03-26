type Updater<State> = (state: State) => Partial<State>;
export type Selector<State, Result> = (state: State) => Result;
export type Listener = () => void;
export type SetState<State> = (updater: Updater<State>) => void;
export type Initializer<State> = (setState: SetState<State>) => State;
export type DebugFn<State> = (prev: State, next: State, updated: Partial<State>) => void;